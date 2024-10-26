const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const mqtt = require('mqtt');
const authenticate = require('../middleware/authenticate');

const mqttClient = mqtt.connect('mqtt://test.mosquitto.org');

// Fetch all devices
router.get('/', authenticate, async (req, res) => {
  try {
    const devices = await Device.find(); // Fetch all devices
    if (!devices.length) return res.status(404).json({ message: 'No devices found' });

    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Toggle device status by ID
router.post('/:id/toggle', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const device = await Device.findById(id);
    if (!device) return res.status(404).send('Device not found.');

    // Toggle the device status
    device.status = device.status === 'on' ? 'off' : 'on';
    await device.save();

    // Publish the toggle command with device ID to the ESP32 via MQTT
    const command = {
      command: 'toggle_device',
      deviceId: id,
    };
    mqttClient.publish('esp32/sensor/data', JSON.stringify(command));

    res.status(200).json(device); // Return updated device status
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;



