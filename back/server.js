const crypto = require('crypto');

// Generate a random JWT secret (32 bytes for strong entropy)
const JWT_SECRET = crypto.randomBytes(32).toString('hex');

// Make JWT_SECRET globally accessible
process.env.JWT_SECRET = JWT_SECRET;

console.log('Random JWT Secret generated:', JWT_SECRET); // Optional: Log to verify it's generated

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mqtt = require('mqtt');
const authRoutes = require('./routes/auth');
const deviceRoutes = require('./routes/devices');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/smart-home', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// MQTT Broker details
const mqttServer = 'mqtt://test.mosquitto.org';
const mqttClient = mqtt.connect(mqttServer);

// Handle MQTT connection
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/devices', deviceRoutes); // Device routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});




