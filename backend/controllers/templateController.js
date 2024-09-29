const asyncHandler = require('express-async-handler');
const Template = require('../models/templateModel');

// Create a new template
const createTemplate = asyncHandler(async (req, res) => {
 //console.log(req.body);
// console.log(req.body);
  const { type, header, content, footer,user_id } = req.body;
 
 // user_id="vnh";
 // console.log(type+" "+header+" "+content+" "+footer+" "+user_id);

 // console.log("Hello");
  if (!type || !header || !content || !footer) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  console.log("Hello");
  const template = new Template({
    type,
    header,
    content,
    footer,
    user_id
  });
//   console.log("Hello");
 // console.log(template);
  await template.save();
  res.status(201).json(template);
});


const getTemplates = asyncHandler(async (req, res) => {
  const  user_id  = req.body.user_id;

  if (!user_id) {
    res.status(400);
    throw new Error("User ID is mandatory!");
  }

  const templates = await Template.find({ user_id });
  res.status(200).json(templates);
});

module.exports = { createTemplate, getTemplates };
