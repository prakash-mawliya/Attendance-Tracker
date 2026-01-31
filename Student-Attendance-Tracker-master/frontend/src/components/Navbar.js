import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Navbar = () => {
  const [subjectCount, setSubjectCount] = useState(0);

  useEffect(() => {
    // Fetch subject count from the backend API
    axios.get('https://student-attendance-tracker.onrender.com/subjects')
      .then(response => {
        setSubjectCount(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching subject count:', error);
      });
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Attendance Tracker</h1>
        <span className="text-white">{`Total Subject ->${subjectCount}`}</span>
      </div>
    </nav>
  );
};

export default Navbar;
