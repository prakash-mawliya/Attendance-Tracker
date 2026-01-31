// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SubjectList = () => {
//   const [subjects, setSubjects] = useState([]);
//    console.log("Subjects",subjects);

//   useEffect(() => {
//     // Fetch subjects from the backend API
//     axios.get('http://localhost:5000/subjects')
//       .then(response => {
//         console.log("RESPONSE", response.data);
//         // Update the subjects list after fetching
//         setSubjects(response.data.map(subject => ({
//           ...subject,
//           totalClasses: subject.totalClasses,
//           attendedClasses: subject.attendedClasses,
//           missedClasses: subject.missedClasses,
//         })));
//       })
//       .catch(error => {
//         console.error('Error fetching subjects:', error);
//       });
//   }, []);

//   const deleteSubject = (id) => {
//     axios.delete(`http://localhost:5000/subjects/${id}`)
//       .then(response => {
//         console.log('Subject deleted successfully:', response.data);
//         // Update the subjects list after deletion
//         setSubjects(subjects.filter(subject => subject._id !== id));
//       })
//       .catch(error => {
//         console.error('Error deleting subject:', error);
//       });
//   };
  
// //   console.log()

//   const calculateAttendancePercentage = (attendedClasses, missedClasses) => {
//     console.log("attended classes:",attendedClasses);
//     // console.log("missed classes:",missedClasses);
//     // console.log("total classes:",totalMissedClasses);
//     if ( (attendedClasses +  missedClasses) === 0) {
//       return 0; // Avoid division by zero
//     }
//     return ((attendedClasses / (attendedClasses +  missedClasses)  ) * 100).toFixed(2); // Calculate and format percentage
//   };

//   const classesNeededFor75Percent = (attendedClasses, missedClasses) => {
//     const currentPercentage = calculateAttendancePercentage(attendedClasses, missedClasses);
//     if (currentPercentage >= 75) {
//       return 0; // Already above 75%, no additional classes needed
//     }
//     const totalClasses = attendedClasses + missedClasses;
//     const targetPercentage = 75;
//     const neededClasses = Math.ceil(((targetPercentage * totalClasses) / 100) - attendedClasses);
//     return neededClasses;
//   };
   
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {subjects.map((subject, index) => (
//         <div key={index} className="bg-white p-4 shadow-md rounded">
//           <h2 className="text-xl font-bold mb-2">{subject.name}</h2>
//           <p className="text-gray-600 mb-2">Classes Attended: {subject.attendedClasses}</p>
//           <p className="text-gray-600 mb-2">Classes Missed: {subject.missedClasses}</p>
//           <p className="text-gray-600 mb-2">Total Classes:{subject.missedClasses + subject.attendedClasses }</p>
//           <p className="text-red-600 font-bold">Total Missed: {subject.totalMissedClasses}</p> 
//           <p className="text-green-600 font-bold">Attendance Percentage: {calculateAttendancePercentage(subject.attendedClasses, subject.missedClasses)}%</p>
//           <p className="text-blue-600 font-bold">Classes Needed for 75%: {classesNeededFor75Percent(subject.attendedClasses, subject.missedClasses)}</p>
//           <button
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             onClick={() => deleteSubject(subject._id)}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SubjectList;




import axios from 'axios';
import { useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const SubjectList = ({ subjects, apiBaseUrl, onDeleteSubject, onUpdateSubject }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedSubjectId, setEditedSubjectId] = useState(null);
  const [editedAttendedClasses, setEditedAttendedClasses] = useState(0);
  const [editedTotalClasses, setEditedTotalClasses] = useState(0);

  const deleteSubject = (id) => {
    axios
      .delete(`${apiBaseUrl}/subjects/${id}`)
      .then(() => {
        onDeleteSubject(id);
      })
      .catch((error) => {
        console.error('Error deleting subject:', error);
      });
  };

  const enterEditMode = (id, attendedClasses, totalClasses) => {
    setEditMode(true);
    setEditedSubjectId(id);
    setEditedAttendedClasses(attendedClasses);
    setEditedTotalClasses(totalClasses);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditedSubjectId(null);
    setEditedAttendedClasses(0);
    setEditedTotalClasses(0);
  };

  const saveEdit = () => {
    axios
      .put(`${apiBaseUrl}/subjects/${editedSubjectId}`, {
        attendedClasses: editedAttendedClasses,
        totalClasses: editedTotalClasses,
      })
      .then((response) => {
        onUpdateSubject(response.data);
        setEditMode(false);
        setEditedSubjectId(null);
        setEditedAttendedClasses(0);
        setEditedTotalClasses(0);
      })
      .catch((error) => {
        console.error('Error saving edited subject:', error);
      });
  };
 

  const calculateAttendancePercentage = (attendedClasses, missedClasses) => {
    console.log("attended classes:",attendedClasses);
    // console.log("missed classes:",missedClasses);
    // console.log("total classes:",totalMissedClasses);
    if ( (attendedClasses +  missedClasses) === 0) {
      return 0; // Avoid division by zero
    }
    return ((attendedClasses / (attendedClasses +  missedClasses)  ) * 100).toFixed(2); // Calculate and format percentage
  };

  const classesNeededFor75Percent = (attendedClasses, missedClasses) => {
    const currentPercentage = calculateAttendancePercentage(attendedClasses, missedClasses);
    if (currentPercentage >= 75) {
      return 0; // Already above 75%, no additional classes needed
    }
    const totalClasses = attendedClasses + missedClasses;
    const targetPercentage = 75;
    const neededClasses = Math.ceil(((targetPercentage * totalClasses) / 100) - attendedClasses);
    return neededClasses;
  };
   

                                                                     
  return (
    <div className="grid grid-cols-3 gap-4">
      {subjects.map((subject, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded">
          <h2 className="text-xl font-bold mb-2">{subject.name}</h2>
          <p className="text-gray-600 mb-2">Classes Attended: {subject.attendedClasses}</p>
          <p className="text-gray-600 mb-2">Classes Missed: {subject.missedClasses}</p>
          <p className="text-gray-600 mb-2">Total Classes: {subject.missedClasses + subject.attendedClasses}</p>
          <p className="text-green-600 font-bold">Attendance Percentage: {calculateAttendancePercentage(subject.attendedClasses, subject.missedClasses)}%</p>
          <p className="text-blue-600 font-bold">Classes Needed for 75%: {classesNeededFor75Percent(subject.attendedClasses, subject.missedClasses)}</p>
          {editMode && editedSubjectId === subject._id ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Attended Classes
                </label>
                <InputRange
                  minValue={0}
                  maxValue={Math.max(1, editedTotalClasses)}
                  value={editedAttendedClasses}
                  onChange={(value) => setEditedAttendedClasses(value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Total Classes
                </label>
                <InputRange
                  minValue={0}
                  maxValue={100}
                  value={editedTotalClasses}
                  onChange={(value) => setEditedTotalClasses(value)}
                />
              </div>
              <div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={saveEdit}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3"
              onClick={() => enterEditMode(subject._id, subject.attendedClasses, subject.totalClasses)}
            >
              Edit Classes
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            onClick={() => deleteSubject(subject._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubjectList;
