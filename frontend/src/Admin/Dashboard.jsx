import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost/Digital-Library-System";
const BOOKS_ENDPOINT = `${API_BASE}/backend/api/books.php`;

const Dashboard = () => {
  const [stats, setStats] = useState({ totalBooks: 0, availableBooks: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  void error;

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${BOOKS_ENDPOINT}?stats=1`);
        const json = await res.json();
        if (!json.success)
          throw new Error(json.error || "Failed to load stats");
        setStats(json.data || { totalBooks: 0, availableBooks: 0 });
      } catch (e) {
        // error intentionally stored for future UI
        setError(e.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen p-5">
      <div className="w-[95%] mx-auto bg-gray-50 rounded-3xl flex overflow-hidden shadow-2xl max-w-7xl">
        {/* SIDEBAR */}
        <div className="w-60 bg-white p-5 shrink-0">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">Admin</h2>

          <div className="menu-title text-xs font-medium text-gray-500 mb-4 uppercase tracking-wider">
            Admin Menu
          </div>
          <ul className="space-y-2.5">
            <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium bg-purple-100 text-purple-600">
              Dashboard
            </li>
            <Link to="/library" className="block">
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium ">
                Library
              </li>
            </Link>

            <Link to="/updates" className="block">
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium">
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
              className="px-4 py-2 rounded-3xl border border-gray-200 shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent"
            />
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium cursor-pointer hover:text-purple-600 transition-colors">
                Log Out
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Dashboard Overview
          </h2>

          {/* STAT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Books */}
            <div className="bg-blue-50 p-6 rounded-3xl flex justify-between items-center shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300 group">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-blue-800 w-[7.5em] mb-1.5 opacity-90">
                  Total Books
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {loading ? "..." : stats.totalBooks.toLocaleString()}
                </h3>
                <span className="text-xs bg-white/30 px-3 py-1.5 rounded-full font-medium text-blue-900">
                  +2.5% from last month
                </span>
              </div>
              <div className="text-4xl p-2.5 bg-white rounded-full shadow-sm flex items-center justify-center w-16 h-16">
                📚
              </div>
            </div>

            {/* Available Books */}
            <div className="bg-emerald-50 p-6 rounded-3xl flex justify-between items-center shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300 group">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-emerald-800 w-[7.5em] mb-1.5 opacity-90 ">
                  Available Books
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stats.availableBooks.toLocaleString()}
                </h3>
                <span className="text-xs bg-white/30 px-3 py-1.5 rounded-full font-medium text-emerald-900">
                  Ready for checkout
                </span>
              </div>
              <div className="text-4xl p-2.5 bg-white rounded-full shadow-sm flex items-center justify-center w-16 h-16">
                ✅
              </div>
            </div>

            {/* Borrowed Books */}
            <div className="bg-orange-50 p-6 rounded-3xl flex justify-between items-center shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300 group">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-orange-800 w-[7.5em] mb-1.5 opacity-90">
                  Borrowed Books
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">4,360</h3>
                <span className="text-xs bg-white/30 px-3 py-1.5 rounded-full font-medium text-orange-900">
                  45 due today
                </span>
              </div>
              <div className="text-4xl p-2.5 bg-white rounded-full shadow-sm flex items-center justify-center w-16 h-16">
                🕒
              </div>
            </div>

            {/* Total Users */}
            <div className="bg-purple-50 p-6 rounded-3xl flex justify-between items-center shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300 group">
              <div className="flex flex-col">
                <span className="text-xs bg-white/30 px-3 py-1.5 rounded-full font-medium text-purple-900">
                  12 new today
                </span>
              </div>
              <div className="text-4xl p-2.5 bg-white rounded-full shadow-sm flex items-center justify-center w-16 h-16">
                👥
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
