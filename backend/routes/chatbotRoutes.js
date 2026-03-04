const express = require("express");
const router = express.Router();
const { generateEmailContent, getCategories } = require("../controllers/chatbotController");
const validateToken = require("../middleware/validateToken");

router.post("/ask", validateToken, generateEmailContent);
router.get("/categories", validateToken, getCategories);

module.exports = router;
