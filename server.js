// Import required modules
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Express app
const app = express();
const port = 3000;

// Access your API key
const API_KEY = "AIzaSyDVDYqvGiu1VVH7o2k9XCM5WNZUJpcQuGs";

// Initialize Generative Model
const genAI = new GoogleGenerativeAI(API_KEY);

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to handle incoming messages
app.post('/sendMessage', async (req, res) => {
  try {
    const prompt = req.body.message;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ response: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
