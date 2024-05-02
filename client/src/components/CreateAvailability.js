import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateAvailability = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timezone, setTimezone] = useState('');
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user/availability', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailabilities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAvailabilities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/user/createavailability', {
          date,
          startTime,
          endTime,
          timezone,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log(response.data);
      setDate('');
      setStartTime('');
      setEndTime('');
      setTimezone('');
      setAvailabilities([...availabilities, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Availability</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input type="time" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input type="time" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="mt-4">
        <h3>Availabilities</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Timezone</th>
            </tr>
          </thead>
          <tbody>
            {availabilities.map((availability, index) => (
              <tr key={index}>
                <td>{new Date(availability.date).toLocaleDateString()}</td>
                <td>{availability.startTime}</td>
                <td>{availability.endTime}</td>
                <td>{availability.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateAvailability;
