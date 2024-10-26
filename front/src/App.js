import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Control from './Control';
import './App.css';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/control" element={<Control />} />
            </Routes>
        </Router>
    );
};

export default App;