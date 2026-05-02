const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Client = require('./models/Client');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/client-brief-tracker';

// Connect to MongoDB - don't crash if it fails
mongoose.connect(MONGO_URI)
    .then(() => console.log(' Connected to MongoDB'))
    .catch(err => console.error(' MongoDB connection error:', err.message));

// Middleware to check DB connection
const checkDB = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ error: 'Database not connected. Please check your MONGO_URI in .env file.' });
    }
    next();
};

// Get dashboard stats
app.get('/api/clients/dashboard-stats', checkDB, async (req, res) => {
    try {
        const total = await Client.countDocuments();
        const completed = await Client.countDocuments({ status: 'Completed' });
        const pending = total - completed;
        res.json({ data: { total, completed, pending } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all clients (with search and filtering)
app.get('/api/clients', checkDB, async (req, res) => {
    try {
        const { status, priority, search } = req.query;
        let query = {};

        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } }
            ];
        }

        const clients = await Client.find(query).sort({ createdAt: -1 });
        res.json({ data: clients });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get single client by ID
app.get('/api/clients/:id', checkDB, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ error: 'Client not found' });
        res.json({ data: client });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add new client
app.post('/api/clients', checkDB, async (req, res) => {
    try {
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.status(201).json({ data: savedClient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update client
app.put('/api/clients/:id', checkDB, async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedClient) return res.status(404).json({ error: 'Client not found' });
        res.json({ message: 'Client updated successfully', data: updatedClient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete client
app.delete('/api/clients/:id', checkDB, async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) return res.status(404).json({ error: 'Client not found' });
        res.json({ message: 'Client deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        dbConnected: mongoose.connection.readyState === 1
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
