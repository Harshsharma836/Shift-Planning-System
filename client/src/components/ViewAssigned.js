import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

const ViewAssigned = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user/shifts', {
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
            <th>Employee Timezone</th>
            <th>Admin Timezone</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift._id}>
              <td>{DateTime.fromISO(shift.date).toLocaleString(DateTime.DATE_FULL)}</td>
              <td>{DateTime.fromISO(shift.startTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</td>
              <td>{DateTime.fromISO(shift.endTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</td>
              <td>{shift.timezone}</td>
              <td>{shift.toTimezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAssigned;
