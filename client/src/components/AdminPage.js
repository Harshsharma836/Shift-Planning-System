import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CreateAvailability from './CreateAvailability';
import ViewAssigned from './ViewAssigned';

const AdminPage = () => {
  return (
    <div>
      <h2>User Page</h2>
      <div>
        <Link to="/admin/availability/" className="btn btn-primary mr-2">View Employee Availability</Link>
        <br></br>
        <Link to="/admin/shift" className="btn btn-secondary">Shift Creation</Link>
      </div>
    </div>
  );
};

export default AdminPage;
