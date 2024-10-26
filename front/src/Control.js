import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Control.css';

const Control = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/devices', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices', error);
      }
    };
    fetchDevices();
  }, []);

  const toggleDevice = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/devices/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device._id === id ? { ...device, status: response.data.status } : device
        )
      );
    } catch (error) {
      console.error('Error toggling device', error);
    }
  };

  return (
    <div>
      <h1>Control Devices</h1>
      {devices.map((device) => (
        <div key={device._id}>
          <p>{device.name} - {device.status}</p>
          <button onClick={() => toggleDevice(device._id)}>Toggle</button>
        </div>
      ))}
    </div>
  );
};

export default Control;
