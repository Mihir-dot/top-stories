const express = require('express');
const variantController = require('../controllers/variantController');
const router = express.Router();

router.get('/multimedias', variantController.getAllVariants);

module.exports = router;
