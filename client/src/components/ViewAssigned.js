import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAssigned = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/shifts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShifts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShifts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Assigned Shifts</h2>
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
          {shifts.map((shift) => (
            <tr key={shift._id}>
              <td>{shift.date}</td>
              <td>{shift.startTime}</td>
              <td>{shift.endTime}</td>
              <td>{shift.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAssigned;
