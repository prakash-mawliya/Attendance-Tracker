


import axios from 'axios';
import { useEffect, useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const SubjectForm = ({ addSubject, apiBaseUrl }) => {
    const [subject, setSubject] = useState('');
    const [attendedClasses, setAttendedClasses] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    
    useEffect(() => {
        // Set totalClasses to a default value initially or fetch it from the backend
        setTotalClasses(100); // Example: setting a default value of 100
    }, []);

    const handleAttendedClassesChange = (value) => {
        // Ensure attendedClasses is not set to more than totalClasses
        if (value <= totalClasses) {
            setAttendedClasses(value);
        }
    };

    const handleTotalClassesChange = (value) => {
        setTotalClasses(value); // Update totalClasses state when slider value changes
        if (attendedClasses > value) {
            setAttendedClasses(value);
        }
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const missedClasses = totalClasses - attendedClasses;
        const totalMissedClasses = missedClasses > 0 ? missedClasses : 0;
        axios
            .post(`${apiBaseUrl}/subjects`, {
                name: subject.trim(),
                attendedClasses,
                totalClasses,
                missedClasses,
                totalMissedClasses,
            })
            .then((response) => {
                addSubject(response.data);
            })
            .catch((error) => {
                console.error('Error adding subject:', error);
            });
        setSubject('');
        // Don't reset attendedClasses or totalClasses here
    };
    
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-10">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Subject Name
                </label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Classes Attended: {attendedClasses}
                </label>
                <InputRange
                    minValue={0}
                    maxValue={Math.max(1, totalClasses)}
                    value={attendedClasses}
                    onChange={handleAttendedClassesChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Total Classes: {totalClasses}
                </label>
                <InputRange
                    minValue={0}
                    maxValue={100} // Adjust maxValue as needed
                    value={totalClasses}
                    onChange={handleTotalClassesChange}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Add Subject
            </button>
        </form>
    );
};

export default SubjectForm;
