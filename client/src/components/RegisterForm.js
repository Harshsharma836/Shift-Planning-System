import React, { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [timeZone, setTimeZone] = useState(null); // Default timeZone is null

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password, role, timeZone);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br></br>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br></br>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </label>
      <br></br>
      <label>
        Timezone:
        <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
          <option value={null}>Select Timezone</option>
          <option value="GMT">GMT</option>
          <option value="IST">IST</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
          {/* Add more timezone options as needed */}
        </select>
      </label>
      <br></br>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
