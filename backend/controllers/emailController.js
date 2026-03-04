const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const Email = require('../models/emailModel');
const { appendToExcel } = require('../utils/excelHelper');

const getEmails = asyncHandler(async (req, res) => {
  try {
    const emails = await Email.find(
      { user_id: req.body.user_id },
      'name id category text to createdAt'
    );
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

const createEmail = async (req, res) => {
  const { name, id, category, text, to, user_id } = req.body;
  if (!name || !id || !category || !text || !to) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const email = new Email({
    name,
    id,
    category,
    text,
    to,
    user_id
  });
  await email.save();

  // Also save to Excel
  appendToExcel('Saved Emails', {
    name,
    id,
    category,
    to,
    user_id,
    text: text.substring(0, 50) + "..." // Truncate text for Excel readability
  });

  res.status(201).json(email);
};

const deleteEmail = asyncHandler(async (req, res) => {
  const email = await Email.findById(req.params.id);
  if (!email) {
    res.status(404);
    throw new Error("Email not found");
  }
  if (email.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("No permission to delete this email");
  }
  await Email.findByIdAndDelete(req.params.id);
  res.status(200).json(email);
});

const sendEmail = asyncHandler(async (req, res) => {
  const { to, cc, subject, text, user_id } = req.body;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    res.status(500).json({ error: 'Email service not configured. Please add EMAIL_USER and EMAIL_PASS to backend/.env' });
    return;
  }

  console.log(`Attempting to send email using: ${process.env.EMAIL_USER}`);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: `MAIL.ME <${process.env.EMAIL_USER}>`,
    to,
    cc,
    subject: subject || "New Message from MAIL.ME",
    text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    // Log to Excel with user context
    appendToExcel('Sent Emails', {
      sender: process.env.EMAIL_USER,
      recipient: to,
      cc,
      subject,
      user_id: user_id || "unknown",
      status: "Success"
    });

    res.status(200).json({ message: 'Email sent successfully!', info: info.response });
  } catch (error) {
    console.error("Nodemailer error:", error);

    appendToExcel('Sent Emails', {
      recipient: to,
      user_id: user_id || "unknown",
      status: "Failed",
      error: error.message
    });

    res.status(500).json({
      error: 'Failed to send email.',
      details: error.message,
      suggestion: "Ensure you are using a Gmail App Password, not your regular password."
    });
  }
});

module.exports = { getEmails, createEmail, deleteEmail, sendEmail };
