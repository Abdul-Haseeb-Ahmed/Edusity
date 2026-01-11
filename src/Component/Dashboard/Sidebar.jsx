import React from 'react';
import { User, BookOpen, Award, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'results', label: 'Live Results', icon: Award },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col fixed left-0 top-0 h-full z-20">
      <div className="p-6">
        <h1 className="text-xl font-bold">Edusity</h1>
      </div>

      <nav className="flex-1 px-3 flex flex-col space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeTab === item.id ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-3 space-y-2 border-t border-gray-800 flex flex-col">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition text-red-400"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;