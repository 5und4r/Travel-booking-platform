# 🌴 Wanderlust South - Travel Booking Platform

​A modern, full-stack travel booking platform built as a capstone project for a Full Stack Development internship. This application specializes in curated getaways across South India and features an integrated AI-powered itinerary planner.

## Key features 
**Aesthetic UI/UX**: Clean, modern design utilizing CSS Grid, flexbox, smooth hover animations, and glassmorphism UI elements.

**​Fully Responsive**: Fluid layout that adapts perfectly to desktop, tablet, and mobile screens.

**​AI Itinerary Planner**: Integrated with Google's Gemini AI. Users can input their stay duration, and the app generates a custom, day-by-day travel plan for their selected destination.

**​Booking System**: Functional frontend form that securely transmits user booking data to the backend.

​**Secure Backend**: A Node.js server that acts as a secure middleman, hiding sensitive API keys from the client browser and handling data storage.

## Tech Stack
​**Frontend**: HTML5, CSS3, Vanilla JavaScript
**​Backend**: Node.js, Express.js
​**Database**: Local JSON File Storage (bookings.json)
**​AI Integration**: Google Gemini API (gemini-2.5-flash.

## Architecture & Functionality 
This project follows a classic Client-Server Architecture:
​**The Client (Frontend)**: The user interacts with the HTML/CSS/JS interface in their browser. When they book a trip or request an itinerary, the frontend sends an HTTP POST request to the backend.

​**The Server (Backend)**: The Express server receives the request.

​*For Bookings*: It reads the data and appends it to a local bookings.json file.
*​For AI*: It securely reads the hidden API key from the .env file, forwards the user's prompt to Google's Gemini servers, formats the response, and sends it back to the client.

## Check it out here:
https://wander-lust-southai.onrender.com

Be sure to comment!
      - 5und4r.
      
