// backend/routes/imageRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {uploadImage} = require('../controllers/imageController');

router.post('/upload', authMiddleware, uploadImage);

module.exports = router;
