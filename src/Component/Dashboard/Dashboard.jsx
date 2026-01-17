import React, { useState, useEffect } from 'react';
import { User, BookOpen, Award, FileText, Users, Settings, LogOut, Bell, Download, Moon, Sun, Calculator, Trophy, TrendingUp } from 'lucide-react';
import { auth } from '../../Config/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function EdusityPortal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSemester, setSelectedSemester] = useState('summer2023');
  const [darkMode, setDarkMode] = useState(false);
  const [showGPACalculator, setShowGPACalculator] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [userData, setUserData] = useState({
    name: 'Student',
    email: 'student@diu.edu',
    studentId: 'LOADING...',
    department: 'Department Of English',
    faculty: 'FHSS',
    batch: '40',
    enrolment: 'Spring 2019',
    university: 'Daffodil International University',
    photo: 'https://ui-avatars.com/api/?name=Student&size=200&background=0D8ABC&color=fff'
  });

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = localStorage.getItem('edusity_user');
      console.log('📦 Stored user data:', storedUser);
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          console.log('✅ Parsed user data:', user);
          
          setUserData({
            name: user.name || 'Student',
            email: user.email || 'student@diu.edu',
            studentId: user.rollNumber || 'N/A',
            department: user.department || 'Not Set',
            faculty: user.faculty || 'Not Set',
            batch: user.batch || 'Not Set',
            enrolment: user.enrolment || 'Not Set',
            university: 'Daffodil International University',
            photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Student')}&size=200&background=0D8ABC&color=fff`
          });
        } catch (error) {
          console.error('❌ Error parsing user data:', error);
        }
      } else {
        console.log('⚠️ No user data found in localStorage');
      }
    };
    
    loadUserData();
  }, []);

  const courses = {
    summer2023: [
      { code: 'ENG235', title: 'English Language Usage', credit: 3, grade: 'A+', gradePoint: 4 },
      { code: 'ENG432', title: 'Psycholinguistics', credit: 3, grade: 'A+', gradePoint: 4 },
      { code: 'ENG334', title: 'Project Paper', credit: 3, grade: 'A+', gradePoint: 4 },
      { code: 'ENG436', title: 'English Language Proficiency', credit: 3, grade: 'A+', gradePoint: 4 }
    ],
    spring2023: [
      { code: 'ENG301', title: 'British Literature', credit: 3, grade: 'A', gradePoint: 3.75 },
      { code: 'ENG302', title: 'American Literature', credit: 3, grade: 'A+', gradePoint: 4 },
      { code: 'ENG303', title: 'Critical Theory', credit: 3, grade: 'A', gradePoint: 3.75 }
    ]
  };

  const performance = {
    classAttended: 46,
    totalClasses: 50,
    quizTaken: 11,
    totalQuiz: 12,
    assignmentSubmitted: 21,
    totalAssignment: 24,
    presentationCompleted: 3,
    totalPresentation: 4
  };

  const upcomingDeadlines = [
    { task: 'English Essay Submission', date: '2024-01-20', type: 'Assignment' },
    { task: 'Psycholinguistics Quiz', date: '2024-01-22', type: 'Quiz' },
    { task: 'Project Presentation', date: '2024-01-25', type: 'Presentation' }
  ];

  const calculateSGPA = (semester) => {
    const semesterCourses = courses[semester];
    const totalPoints = semesterCourses.reduce((sum, course) => sum + (course.gradePoint * course.credit), 0);
    const totalCredits = semesterCourses.reduce((sum, course) => sum + course.credit, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const calculatePercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  const getAchievements = () => {
    const achievements = [];
    if (calculatePercentage(performance.classAttended, performance.totalClasses) >= 90) {
      achievements.push({ name: 'Perfect Attendance', icon: '🎯', color: 'bg-green-100 text-green-800' });
    }
    if (calculateSGPA(selectedSemester) >= 3.8) {
      achievements.push({ name: 'High Achiever', icon: '🏆', color: 'bg-yellow-100 text-yellow-800' });
    }
    if (calculatePercentage(performance.assignmentSubmitted, performance.totalAssignment) >= 85) {
      achievements.push({ name: 'Assignment Master', icon: '📚', color: 'bg-blue-100 text-blue-800' });
    }
    return achievements;
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await auth.signOut();
        localStorage.removeItem('edusity_auth');
        localStorage.removeItem('edusity_user');
        navigate('/signin', { replace: true });
      } catch (error) {
        console.error('Logout error:', error);
        alert('Error logging out. Please try again.');
      }
    }
  };

  const downloadResult = () => {
    alert('Result PDF download feature - In production, this would generate a PDF of your results');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {userData.name.split(' ')[0]}! 👋</h2>
        <p className="opacity-90">Roll Number: {userData.studentId}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{courses[selectedSemester].length}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Enrolled Courses</h3>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="text-green-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{calculateSGPA(selectedSemester)}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Current SGPA</h3>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="text-purple-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{performance.assignmentSubmitted}/{performance.totalAssignment}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Assignments</h3>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="text-orange-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{calculatePercentage(performance.classAttended, performance.totalClasses)}%</span>
          </div>
          <h3 className="text-gray-600 text-sm">Attendance</h3>
        </div>
      </div>

      {/* Achievements Section */}
      {getAchievements().length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-500" size={24} />
            <h3 className="text-lg font-bold text-gray-800">Your Achievements</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {getAchievements().map((achievement, idx) => (
              <div key={idx} className={`${achievement.color} px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2`}>
                <span>{achievement.icon}</span>
                <span>{achievement.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Courses</h3>
          <div className="space-y-3">
            {courses[selectedSemester].slice(0, 3).map((course, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BookOpen className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{course.title}</h4>
                    <p className="text-sm text-gray-500">{course.code}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{course.grade}</div>
                  <div className="text-xs text-gray-500">{course.credit} Credits</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline, idx) => (
              <div key={idx} className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-sm font-semibold text-gray-800">{deadline.task}</p>
                <p className="text-xs text-gray-500">{deadline.date}</p>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">{deadline.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Quiz Completion</span>
              <span className="font-semibold">{calculatePercentage(performance.quizTaken, performance.totalQuiz)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: `${calculatePercentage(performance.quizTaken, performance.totalQuiz)}%`}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Assignment Rate</span>
              <span className="font-semibold">{calculatePercentage(performance.assignmentSubmitted, performance.totalAssignment)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full transition-all" style={{width: `${calculatePercentage(performance.assignmentSubmitted, performance.totalAssignment)}%`}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Attendance</span>
              <span className="font-semibold">{calculatePercentage(performance.classAttended, performance.totalClasses)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-teal-600 h-2 rounded-full transition-all" style={{width: `${calculatePercentage(performance.classAttended, performance.totalClasses)}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-gray-800">Live Results</h2>
          <div className="flex gap-3">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="summer2023">Summer 2023</option>
              <option value="spring2023">Spring 2023</option>
            </select>
            <button
              onClick={downloadResult}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course Code</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course Title</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Credit</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Grade</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses[selectedSemester].map((course, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{course.code}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.title}</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-600">{course.credit}</td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {course.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-semibold text-gray-800">{course.gradePoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 p-4 bg-blue-50 rounded-lg">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Total Credit Requirement: <span className="font-bold text-gray-800">9</span></p>
            <p className="text-sm text-gray-600">Total Credit Taken: <span className="font-bold text-gray-800">{courses[selectedSemester].reduce((sum, c) => sum + c.credit, 0)}</span></p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">SGPA</p>
            <p className="text-3xl font-bold text-blue-600">{calculateSGPA(selectedSemester)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Overall Performance This Semester</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Class Attended</p>
              <p className="text-2xl font-bold text-gray-800">{performance.classAttended}/{performance.totalClasses}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Quiz Taken</p>
              <p className="text-2xl font-bold text-gray-800">{performance.quizTaken}/{performance.totalQuiz}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Assignment Submitted</p>
              <p className="text-2xl font-bold text-gray-800">{performance.assignmentSubmitted}/{performance.totalAssignment}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Presentation Completed</p>
              <p className="text-2xl font-bold text-gray-800">{performance.presentationCompleted}/{performance.totalPresentation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Profile</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <img src={userData.photo} alt="Student" className="w-32 h-32 rounded-full border-4 border-blue-100" />
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase mb-1">Full Name</p>
                <p className="font-semibold text-gray-800">{userData.name}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase mb-1">Roll Number</p>
                <p className="font-semibold text-blue-600">{userData.studentId}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase mb-1">Email</p>
                <p className="font-semibold text-gray-800">{userData.email}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase mb-1">Department</p>
                <p className="font-semibold text-gray-800">{userData.department}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase mb-1">Faculty</p>
                <p className="font-semibold text-gray-800">{userData.faculty}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase mb-1">Batch</p>
                <p className="font-semibold text-gray-800">{userData.batch}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase mb-1">Enrolment</p>
                <p className="font-semibold text-gray-800">{userData.enrolment}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase mb-1">University</p>
                <p className="font-semibold text-gray-800">{userData.university}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
        
        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Dark Mode</h3>
                <p className="text-sm text-gray-600">Toggle dark theme (Coming Soon)</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-14 h-7 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'} relative`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>

          {/* Password Change */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Change Password</h3>
            <p className="text-sm text-gray-600 mb-3">Update your account password</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Change Password
            </button>
          </div>

          {/* Notifications */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Notification Preferences</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Email notifications for grades</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Assignment deadline reminders</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Weekly performance summary</span>
              </label>
            </div>
          </div>

          {/* Privacy */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Privacy & Security</h3>
            <p className="text-sm text-gray-600 mb-3">Manage your privacy settings</p>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Privacy Settings
            </button>
          </div>

          {/* Account Actions */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Danger Zone</h3>
            <p className="text-sm text-red-600 mb-3">Irreversible account actions</p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'results':
        return renderResults();
      case 'profile':
        return renderProfile();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "256px" : "0",
          backgroundColor: "#111827",
          color: "white",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          zIndex: 1000,
          transition: "width 0.3s ease",
          overflow: "hidden"
        }}
      >
        <div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "bold", margin: 0, marginBottom: "6px", letterSpacing: "-0.5px" }}>
            Edusity
          </h1>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>Student Portal</p>
        </div>

        <nav style={{ flex: 1, padding: "24px 16px", overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "107px"}}>
            {[
              { id: 'dashboard', icon: BookOpen, label: 'Dashboard' },
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'results', icon: Award, label: 'Live Results' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  backgroundColor: activeTab === item.id ? "#2563eb" : "transparent",
                  color: activeTab === item.id ? "white" : "#d1d5db",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontSize: "15px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) e.currentTarget.style.backgroundColor = "#1f2937";
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div style={{ padding: "20px 16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop:"180px" }}> 
            <button
              onClick={() => setActiveTab('settings')}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "10px",
                backgroundColor: activeTab === 'settings' ? "#2563eb" : "transparent",
                color: activeTab === 'settings' ? "white" : "#d1d5db",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "15px",
                fontWeight: "500"
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'settings') e.currentTarget.style.backgroundColor = "#1f2937";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'settings') e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "10px",
                backgroundColor: "transparent",
                color: "#f87171",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "15px",
                fontWeight: "500"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1f2937"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? '256px' : '0', display: 'flex', flexDirection: 'column', transition: 'margin-left 0.3s ease' }}>
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <BookOpen size={20} style={{ color: '#4b5563' }} />
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'results' && 'Live Results'}
              {activeTab === 'profile' && 'Student Profile'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <Bell size={20} style={{ color: '#4b5563' }} />
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#ef4444',
                borderRadius: '50%'
              }}></span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={userData.photo} alt="Profile" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #dbeafe'
              }} />
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{userData.name}</p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{userData.studentId}</p>
              </div>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}