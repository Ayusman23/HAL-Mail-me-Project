const mongoose = require('mongoose');

const templateSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    footer: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
