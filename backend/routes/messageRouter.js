// messageRouter.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Adjust the path based on your project structure

// POST /api/messages
router.post('/', async (req, res) => {
    const { name, message } = req.body;

    // Basic validation
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }

    try {
        // Create a new message document
        const newMessage = new Message({
            name,
            message,
            timestamp: new Date(),
        });

        // Save the message to the database
        const savedMessage = await newMessage.save();

        // Respond with the saved message
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET endpoint to retrieve all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find(); // Fetch all messages from the database
        res.status(200).json(messages); // Respond with the messages
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});


module.exports = router;
