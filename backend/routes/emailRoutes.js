const express = require('express');
const router = express.Router();
const { getEmails, createEmail, deleteEmail, sendEmail } = require('../controllers/emailController');
const { protect } = require('../middleware/authMiddleware');

router.route('/getemails').get(protect, getEmails)
router.route('/postemails').post(protect, createEmail);
router.route('/send-email').post(protect, sendEmail);

router.route('/:id').delete(protect, deleteEmail);

module.exports = router;
