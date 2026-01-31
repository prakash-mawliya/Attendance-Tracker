// src/App.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import SubjectForm from './components/SubjectForm';
import SubjectList from './components/SubjectList';
import './index.css';

const App = () => {
  const [subjects, setSubjects] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_URL || 'https://student-attendance-tracker.onrender.com';

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get(`${apiBaseUrl}/subjects`);
      setSubjects(response.data);
    };
    fetchSubjects();
  }, [apiBaseUrl]);

  const addSubject = (newSubject) => {
    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
  };

  const updateSubject = (updatedSubject) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject._id === updatedSubject._id ? updatedSubject : subject
      )
    );
  };

  const deleteSubject = (id) => {
    setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject._id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10">
        <SubjectForm addSubject={addSubject} apiBaseUrl={apiBaseUrl} />
        <SubjectList
          subjects={subjects}
          apiBaseUrl={apiBaseUrl}
          onDeleteSubject={deleteSubject}
          onUpdateSubject={updateSubject}
        />
      </div>
    </div>
  );
};

export default App;
