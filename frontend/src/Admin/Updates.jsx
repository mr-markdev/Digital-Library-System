import React from "react";
import { Link } from "react-router-dom";

const Updates = () => {
  const updates = [
    {
      id: 1,
      time: "10:15 AM",
      message: 'New Book Added: "Atomic Habits" has been added to the library.',
      type: "info",
    },
    {
      id: 2,
      time: "9:40 AM",
      message: 'Book Returned: Juan Dela Cruz returned "The Great Gatsby".',
      type: "success",
    },
    {
      id: 3,
      time: "Yesterday",
      message: 'Due Reminder: "1984" is due tomorrow (Maria Santos).',
      type: "warning",
    },
    {
      id: 4,
      time: "Yesterday",
      message: 'Overdue Alert: "The Alchemist" is overdue by 3 days.',
      type: "danger",
    },
    {
      id: 5,
      time: "April 20",
      message: "New User Registered: Kevin Torres joined the system.",
      type: "info",
    },
    {
      id: 6,
      time: "April 20",
      message: 'Inventory Updated: 5 new copies of "Sapiens" added.',
      type: "success",
    },
  ];

  const getUpdateCardStyles = (type) => {
    switch (type) {
      case "info":
        return "border-l-[#5a3ec8] bg-purple-50";
      case "success":
        return "border-l-green-500 bg-green-50";
      case "warning":
        return "border-l-yellow-400 bg-yellow-50";
      case "danger":
        return "border-l-red-500 bg-red-50";
      default:
        return "border-l-gray-400 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-[#e8dcf0] p-5">
      <div className="w-[95%] mx-auto bg-gray-100 rounded-[20px] flex overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-60 bg-white p-5 shrink-0">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">Admin</h2>

          <div className="menu-title text-xs font-medium text-gray-500 mb-4 uppercase tracking-wider">
            Admin Menu
          </div>
          <ul className="space-y-2.5">
            <Link to="/" className="block">
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium ">
                Dashboard
              </li>
            </Link>
            <Link to="/library" className="block">
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium">
                Library
              </li>
            </Link>

            <Link to="/updates" className="block">
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium bg-purple-100 text-purple-600">
                Updates
              </li>
            </Link>
            <Link to="/borrowers" className="block">
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium">
                Borrowers List
              </li>
            </Link>
            <Link to="/addnewbook" className="block">
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium">
                Add New Books
              </li>
            </Link>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-5">
          {/* TOPBAR */}
          <div className="flex justify-between items-center mb-5">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 rounded-full w-[250px] border-none focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <div className="flex items-center gap-2.5">
              <span className="text-gray-700">Log Out</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-7.5 text-gray-800">Updates</h2>

          {/* UPDATES CONTAINER */}
          <div className="mt-4 flex flex-col gap-3">
            {updates.map((update) => (
              <div
                key={update.id}
                className={`p-4 rounded-xl bg-white flex justify-between items-center text-sm border-l-4 ${getUpdateCardStyles(update.type)}`}
              >
                <span className="text-xs text-gray-500 min-w-[80px]">
                  {update.time}
                </span>
                <p className="text-gray-700 flex-1">
                  <strong>{update.message.split(":")[0]}:</strong>
                  {update.message.split(":").slice(1).join(":")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;
