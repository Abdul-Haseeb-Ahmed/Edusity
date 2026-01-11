import React, { useState } from 'react';
import { User, BookOpen, Award, FileText, Users, Settings, LogOut, Bell } from 'lucide-react';

export default function EdusityPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSemester, setSelectedSemester] = useState('summer2023');
  
  const userData = {
    name: 'Haseeb Ahmed',
    email: 'haseeb@student.diu.edu',
    studentId: '26JOHSXUABD',
    department: 'Department Of English',
    faculty: 'FHSS',
    batch: '40',
    enrolment: 'Spring 2019',
    university: 'Daffodil International University',
    photo: 'https://ui-avatars.com/api/?name=Haseeb+Ahmed&size=200&background=0D8ABC&color=fff'
  };

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

  const calculateSGPA = (semester) => {
    const semesterCourses = courses[semester];
    const totalPoints = semesterCourses.reduce((sum, course) => sum + (course.gradePoint * course.credit), 0);
    const totalCredits = semesterCourses.reduce((sum, course) => sum + course.credit, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const calculatePercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  const handleLogout = () => {
    alert('Logout functionality - In real app, this would sign you out');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {userData.name.split(' ')[0]}! 👋</h2>
        <p className="opacity-90">Here's your academic overview for this semester</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{courses[selectedSemester].length}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Enrolled Courses</h3>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="text-green-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{calculateSGPA(selectedSemester)}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Current SGPA</h3>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="text-purple-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{performance.assignmentSubmitted}/{performance.totalAssignment}</span>
          </div>
          <h3 className="text-gray-600 text-sm">Assignments</h3>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="text-orange-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{calculatePercentage(performance.classAttended, performance.totalClasses)}%</span>
          </div>
          <h3 className="text-gray-600 text-sm">Attendance</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Courses</h3>
          <div className="space-y-3">
            {courses[selectedSemester].slice(0, 3).map((course, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Quiz Completion</span>
                <span className="font-semibold">{calculatePercentage(performance.quizTaken, performance.totalQuiz)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: `${calculatePercentage(performance.quizTaken, performance.totalQuiz)}%`}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Assignment Rate</span>
                <span className="font-semibold">{calculatePercentage(performance.assignmentSubmitted, performance.totalAssignment)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: `${calculatePercentage(performance.assignmentSubmitted, performance.totalAssignment)}%`}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Attendance</span>
                <span className="font-semibold">{calculatePercentage(performance.classAttended, performance.totalClasses)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{width: `${calculatePercentage(performance.classAttended, performance.totalClasses)}%`}}></div>
              </div>
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
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="summer2023">Summer 2023</option>
            <option value="spring2023">Spring 2023</option>
          </select>
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
                <tr key={idx} className="hover:bg-gray-50">
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
                <p className="text-xs text-gray-500 uppercase mb-1">Student ID</p>
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

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'results':
        return renderResults();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
{/* Sidebar - Fixed */}
<div
  style={{
    width: "256px",
    backgroundColor: "#111827",
    color: "white",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    zIndex: 1000,
  }}
>
  {/* Logo / Header */}
  <div
    style={{
      padding: "24px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      marginBottom: "171px", // 👈 divider ke baad space
    }}
  >
    <h1
      style={{
        fontSize: "26px",
        fontWeight: "bold",
        margin: 0,
        marginBottom: "6px",
        letterSpacing: "-0.5px",
      }}
    >
      Edusity
    </h1>
    <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
      Student Portal
    </p>
  </div>

  {/* Navigation */}
  <nav
    style={{
      flex: 1,
      padding: "16px 16px 24px",
      overflowY: "auto",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px", // 👈 spacing between buttons
        marginTop: "107px", // 👈 buttons start after divider
      }}
    >
      {/* Dashboard */}
      <button
        onClick={() => setActiveTab("dashboard")}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 16px",
          borderRadius: "10px",
          backgroundColor:
            activeTab === "dashboard" ? "#2563eb" : "transparent",
          color: activeTab === "dashboard" ? "white" : "#d1d5db",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s ease",
          fontSize: "15px",
          fontWeight: "500",
        }}
        onMouseEnter={(e) => {
          if (activeTab !== "dashboard")
            e.currentTarget.style.backgroundColor = "#1f2937";
        }}
        onMouseLeave={(e) => {
          if (activeTab !== "dashboard")
            e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <BookOpen size={20} />
        <span>Dashboard</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => setActiveTab("profile")}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 16px",
          borderRadius: "10px",
          backgroundColor:
            activeTab === "profile" ? "#2563eb" : "transparent",
          color: activeTab === "profile" ? "white" : "#d1d5db",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s ease",
          fontSize: "15px",
          fontWeight: "500",
        }}
        onMouseEnter={(e) => {
          if (activeTab !== "profile")
            e.currentTarget.style.backgroundColor = "#1f2937";
        }}
        onMouseLeave={(e) => {
          if (activeTab !== "profile")
            e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <User size={20} />
        <span>Profile</span>
      </button>

      {/* Live Results */}
      <button
        onClick={() => setActiveTab("results")}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 16px",
          borderRadius: "10px",
          backgroundColor:
            activeTab === "results" ? "#2563eb" : "transparent",
          color: activeTab === "results" ? "white" : "#d1d5db",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s ease",
          fontSize: "15px",
          fontWeight: "500",
        }}
        onMouseEnter={(e) => {
          if (activeTab !== "results")
            e.currentTarget.style.backgroundColor = "#1f2937";
        }}
        onMouseLeave={(e) => {
          if (activeTab !== "results")
            e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <Award size={20} />
        <span>Live Results</span>
      </button>
    </div>
  </nav>

  {/* Bottom Section */}
  <div
    style={{
      padding: "20px 16px",
      borderTop: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <button
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 16px",
          borderRadius: "10px",
          backgroundColor: "transparent",
          color: "#d1d5db",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s ease",
          fontSize: "15px",
          fontWeight: "500",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#1f2937")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
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
          fontWeight: "500",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#1f2937")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '256px', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
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
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'results' && 'Live Results'}
            {activeTab === 'profile' && 'Student Profile'}
          </h2>
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

        {/* Content Area */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
// changes karni ha abhi