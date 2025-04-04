const express = require('express');
const githubRouter = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
const config = require('../utils/config');

dotenv.config();

const GITHUB_USERNAME = 'Alex-Turing';
const GITHUB_TOKEN = config.GITHUB_TOKEN;
const GITHUB_URL = config.GITHUB_URL;

githubRouter.get('/repos', async (req, res) => {
    try {
        const response = await axios.get(`${GITHUB_URL}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching repos', error: error.message });
    }
});

githubRouter.get('/repos/:repo/languages', async (req, res) => {
    const { repo } = req.params;
    try {
        const response = await axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/languages`, { // Endpoint Example: "https://api.github.com/repos/Alex-Turing/react-phonebook-nodejs-backend-mongoDB/languages"
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });
        res.json(response.data);
    }
    catch (error) {2
        res.status(500).json({ message: 'Error fetching repo languages', error: error.message});
    }
});

module.exports = githubRouter;