const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config(); // This loads environment variables from a .env file

const app = express();
// Enable CORS for all origins, allowing your GitHub Pages frontend to communicate
app.use(cors()); 
app.use(express.json());

// Initialize GoogleGenerativeAI with API key from environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/ask-auraa', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using the fast and capable Flash model
        const prompt = req.body.prompt;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ response: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ response: "I'm sorry, my brain is feeling a bit fuzzy right now. Please try again later." });
    }
});

// Use the PORT environment variable provided by Render, or default to 10000 for local testing
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`AURAA's brain is listening on port ${PORT}`);
});
