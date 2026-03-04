const express = require('express');
const router = express.Router();
const { createTemplate, getTemplates } = require('../controllers/templateController');
const { protect } = require('../middleware/authMiddleware'); 

router.route('/create')
  .post(protect, createTemplate);

router.route('/get')
  .get(protect, getTemplates);

module.exports = router;
