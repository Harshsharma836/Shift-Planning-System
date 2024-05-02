import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CreateAvailability from './CreateAvailability';
import ViewAssigned from './ViewAssigned';

const UserPage = () => {
  return (
    <div>
      <h2>User Page</h2>
      <div>
        <Link to="/availability/create" className="btn btn-primary mr-2">Create Availability</Link>
        <br></br>
        <Link to="/availability/assigned" className="btn btn-secondary">View Assigned</Link>
      </div>
    
    </div>
  );
};

export default UserPage;
