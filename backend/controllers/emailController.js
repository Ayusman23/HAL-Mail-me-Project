const asyncHandler = require('express-async-handler');
const Email = require('../models/emailModel');

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

module.exports = { getEmails, createEmail, deleteEmail };
