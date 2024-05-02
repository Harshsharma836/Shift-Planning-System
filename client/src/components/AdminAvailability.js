import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

const AdminAvailability = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employeeAvailability, setEmployeeAvailability] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('GMT');

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

  const handleEmployeeSelect = async (e) => {
    const userId = e.target.value;
    setSelectedEmployee(userId);
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`http://localhost:5000/admin/availability/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.availability)) {
        setEmployeeAvailability(response.data.availability);
      } else {
        setEmployeeAvailability([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
  };

  const convertTimezone = (date, startTime, endTime, timezone, toTimezone) => {
    const dateTime = DateTime.fromISO(date, { zone: timezone });
    const startDateTime = dateTime.set({ hour: Number(startTime.split(':')[0]), minute: Number(startTime.split(':')[1]) });
    const endDateTime = dateTime.set({ hour: Number(endTime.split(':')[0]), minute: Number(endTime.split(':')[1]) });
    const convertedStartDatetime = startDateTime.setZone(toTimezone);
    const convertedEndDatetime = endDateTime.setZone(toTimezone);
    const formattedStartTime = convertedStartDatetime.toFormat('HH:mm');
    const formattedEndTime = convertedEndDatetime.toFormat('HH:mm');
    return `${formattedStartTime} - ${formattedEndTime}`;
  };

  return (
  <div className="container mt-4">
    <h2>View Employee Availability</h2>
    <div className="form-group">
      <label>Select Employee:</label>
      <select className="form-control" onChange={handleEmployeeSelect}>
        <option value="">Select an employee</option>
        {employees.map((employee) => (
          <option key={employee._id} value={employee._id}>
            {employee.email}
          </option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label>Select Timezone:</label>
      <select className="form-control" value={selectedTimezone} onChange={handleTimezoneChange}>
        <option value="GMT">GMT</option>
        <option value="IST">IST</option>
        <option value="EST">EST</option>
        <option value="PST">PST</option>
      </select>
    </div>
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {employeeAvailability.map((availability, index) => (
            <tr key={index}>
              <td>{DateTime.fromISO(availability.date).toFormat('dddd, MMMM dd yyyy')}</td>
              <td>{convertTimezone(availability.date, availability.startTime, availability.endTime, availability.timezone, selectedTimezone)}</td>
              {/* <td>{convertTimezone(availability.date, availability.endTime, availability.endTime, availability.timezone, selectedTimezone)}</td> */}
              <td>{selectedTimezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default AdminAvailability;
