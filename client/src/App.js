import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate     } from 'react-router-dom';

import axios from 'axios';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import CreateAvailability from './components/CreateAvailability'
import ViewAssigned from './components/ViewAssigned'
import AdminAvailability from './components/AdminAvailability';
import ShiftCreation from './components/ShiftCreation';

const App = () => {
  const [user, setUser] = useState(null);

  const [redirectToLogin, setRedirectToLogin] = useState(false);



  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      setUser(response.data);

      localStorage.setItem('token', response.data.token);
      
      if (response.data.role === 'admin') {
        window.location.href = '/admin';
      } else if (response.data.role === 'user') {
        window.location.href = '/user';
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  

  const handleRegister = async (email, password, role, timeZone) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { email, password, role , timeZone });
      setUser(response.data.user);
      setRedirectToLogin(true);


    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Router>
            {redirectToLogin && <Navigate to="/login" replace />}

      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterForm onRegister={handleRegister} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/availability/create" element={<CreateAvailability />} />
        <Route path="/availability/assigned" element={<ViewAssigned />} />
        <Route path="/admin/availability" element={<AdminAvailability />} />
        <Route path="/admin/shift" element={< ShiftCreation/>} />
      </Routes>
    </Router>
  );
};

export default App;
