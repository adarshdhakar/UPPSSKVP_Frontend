import React from 'react';
import { Home, MessageCircle, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 h-screen fixed">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Dashboard
      </div>
      <ul className="mt-4">
        <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
          <Home className="mr-2" /> Home
        </li>
        <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
          <MessageCircle className="mr-2" /> Chat
        </li>
        <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
          <Settings className="mr-2" /> Settings
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
