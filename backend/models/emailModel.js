const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "Please enter a name"
        ]
    },
    id: {
        type: String,
        required: [
            true,
            "Please enter an id"
        ],
        unique: [true, "ID is already in use"]
    },
    category: {
        type: String,
        required: [
            true,
            "Please enter a category"
        ]
    },
    text: {
        type: String,
        required: [
            true,
            "Please enter text"
        ]
    },
    to: {
        type: String,
        required: [
            true,
            "Please enter a recipient"
        ]
    },
    user_id:{
        type: String,
        required: [
            true,
            "Please enter"
        ]
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Email', emailSchema);
