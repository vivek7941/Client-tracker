const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: String,
    contactNumber: String,
    requirements: String,
    budgetRange: String,
    status: {
        type: String,
        enum: ['New', 'In Progress', 'Completed', 'On Hold'],
        default: 'New'
    },
    deadline: Date,
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    notes: String,
    serviceType: String
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
