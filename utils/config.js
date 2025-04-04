require('dotenv').config();

const PORT = process.env.PORT || 5000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_URL = process.env.GITHUB_URL;

module.exports = {
    PORT,
    GITHUB_TOKEN,
    GITHUB_URL
}