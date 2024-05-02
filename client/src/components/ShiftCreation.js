import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

const ShiftCreation = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timezone, setTimezone] = useState('GMT');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/admin/employees', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data.employees);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);

  const handleShiftCreation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/admin/shifts', {
        date,
        startTime,
        endTime,
        timezone,
        employeeId: selectedEmployee,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Shift</h2>
      <div className="form-group">
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Start Time:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <div className="form-group">
        <label>End Time:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Timezone:</label>
        <select className="form-control" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          <option value="GMT">GMT</option>
          <option value="IST">IST</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
        </select>
      </div>
      <div className="form-group">
        <label>Select Employee:</label>
        <select className="form-control" onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="">Select an employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.email}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleShiftCreation}>Create Shift</button>
    </div>
  );
};

export default ShiftCreation;
