import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { auth } from '../../Config/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth'; // onAuthStateChanged add kiya
import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import DashboardView from './DashboardView';

export default function EdusityPortal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSemester, setSelectedSemester] = useState('summer2023');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- DATA (Jo missing tha) ---
  const courses = {
    summer2023: [
      { code: 'ENG235', title: 'English Language Usage', credit: 3, grade: 'A+', gradePoint: 4 },
      { code: 'ENG432', title: 'Psycholinguistics', credit: 3, grade: 'A+', gradePoint: 4 },
      { code: 'ENG334', title: 'Project Paper', credit: 3, grade: 'A+', gradePoint: 4 },
      { code: 'ENG436', title: 'English Language Proficiency', credit: 3, grade: 'A+', gradePoint: 4 }
    ],
    spring2023: [
      { code: 'ENG301', title: 'British Literature', credit: 3, grade: 'A', gradePoint: 3.75 }
    ]
  };

  const performance = {
    classAttended: 46, totalClasses: 50,
    quizTaken: 11, totalQuiz: 12,
    assignmentSubmitted: 21, totalAssignment: 24,
    presentationCompleted: 3, totalPresentation: 4
  };

  const calculateSGPA = (semester) => {
    const semCourses = courses[semester];
    const totalPoints = semCourses.reduce((sum, course) => sum + (course.gradePoint * course.credit), 0);
    const totalCredits = semCourses.reduce((sum, course) => sum + course.credit, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const calculatePercentage = (completed, total) => Math.round((completed / total) * 100);

  const generateStudentId = (email, uid) => {
    const year = new Date().getFullYear().toString().slice(-2);
    const uidPart = uid?.slice(0, 6).toUpperCase() || "USER";
    return `${year}${uidPart}`;
  };

  // --- LOGIC FIX (Loading stop karne ke liye) ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const studentId = generateStudentId(user.email, user.uid);
        setUserData({
          name: user.displayName || 'Student',
          email: user.email,
          studentId: studentId,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'Student')}&background=0D8ABC&color=fff`
        });
      } else {
        const storedUser = localStorage.getItem('edusity_user');
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        } else {
          navigate('/signin');
        }
      }
      setLoading(false); // Yeh line loading khatam karti hai
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/signin', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Portal...</p>
        </div>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      
      <div className="flex-1 ml-64 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <img src={userData.photo} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-100" />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">{userData.name}</p>
                <p className="text-xs text-gray-500">{userData.studentId}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <DashboardView 
              userData={userData}
              courses={courses}
              selectedSemester={selectedSemester}
              performance={performance}
              calculateSGPA={calculateSGPA}
              calculatePercentage={calculatePercentage}
            />
          )}
          {activeTab === 'results' && <div className="p-4 bg-white rounded shadow">Results Section Comming Soon</div>}
          {activeTab === 'profile' && <div className="p-4 bg-white rounded shadow">Profile Section Comming Soon</div>}
        </main>
      </div>
    </div>
  );
}