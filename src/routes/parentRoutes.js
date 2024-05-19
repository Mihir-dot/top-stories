const express = require('express');
const axios = require('axios');
const parentController = require('../controllers/parentController');
const router = express.Router();
const config = require('../config/config');
// Fetch data from the URL provided in the request body and pass it to createParent
router.post('/top-stories', async (req, res) => {
    const section = req.body.section;
    // Check if section is provided
    if (!section) {
        return res.status(400).json({ message: "Section is required" });
    }
    // Check if api_key is provided
    const api_key = req.body.api_key;
    if (!api_key) {
        return res.status(400).json({ message: "API Key is required" });
    }
    const apiUrl = `${config.baseUrl}${section}.json?api-key=${api_key}`


    try {
        // Make axios request
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Pass the data to the createParent controller
        await parentController.createParent(data, res);
    } catch (err) {
        // Handle axios request error
        if (err.code === 'ENOTFOUND' || err.code === "ERR_BAD_REQUEST") {
            return res.status(400).json({ message: "Invalid URL" });
        } else {
            return res.status(500).json({ message: err.message });
        }
    }
});
router.get('/top-stories', parentController.getAllParents);

module.exports = router;

