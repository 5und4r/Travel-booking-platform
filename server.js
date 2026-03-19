// Load our hidden environment variables from the .env file
require('dotenv').config(); 
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Tell our server to understand JSON data and to serve the 'public' folder
app.use(express.json());
app.use(express.static('public')); 

// --- ENDPOINT 1: Save Bookings to a JSON file ---
app.post('/api/book', (req, res) => {
    const newBooking = req.body;
    const filePath = path.join(__dirname, 'bookings.json');

    let bookings = [];
    
    // Check if bookings.json already exists. If yes, read it first.
    if (fs.existsSync(filePath)) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            if (fileData) bookings = JSON.parse(fileData);
        } catch (e) {
            console.error("Error reading file:", e);
        }
    }

    // Add the new booking to the list and save it back to the file
    bookings.push(newBooking);
    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));
    
    res.json({ message: 'Booking saved successfully!' });
});

// --- ENDPOINT 2: Securely call the Gemini AI ---
app.post('/api/itinerary', async (req, res) => {
    const { prompt } = req.body;
    
    // Securely grab the key from your .env file! It never goes to the browser.
    const apiKey = process.env.GEMINI_API_KEY; 
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                systemInstruction: { parts: [{ text: "You are an enthusiastic and expert travel planner. Create concise, well-structured, day-by-day itineraries. Keep responses brief but exciting. Format the output with clear line breaks for readability. Do not use markdown headers (like # or **), just use standard uppercase formatting for Day headings." }] }
            })
        });

        if (!response.ok) throw new Error("Google API Error");
        
        const data = await response.json();
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text || "No itinerary generated.";
        
        res.json({ itinerary: textResult });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: "Failed to communicate with AI." });
    }
});

// Boot up the server!
app.listen(PORT, () => {
    console.log(`\n🚀 Success! Your server is running.`);
    console.log(`👉 Open your browser and go to: http://localhost:${PORT}\n`);
});