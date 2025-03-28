require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CAT_API_URL = 'https://api.thecatapi.com/v1';
const API_KEY = process.env.CAT_API_KEY;

// Get cat breeds
app.get('/breeds', async (req, res) => {
    try {
        const response = await axios.get(`${CAT_API_URL}/breeds`, {
            headers: { 'x-api-key': API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching breeds', error });
    }
});

// Get cat images
app.get('/cats', async (req, res) => {
    try {
        const { breed_id, limit = 5 } = req.query;
        const response = await axios.get(`${CAT_API_URL}/images/search`, {
            params: { breed_id, limit },
            headers: { 'x-api-key': API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cat images', error });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
