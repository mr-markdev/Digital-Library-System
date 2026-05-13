import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost/Digital-Library-System";

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/backend/api/updates.php`);
        const json = await res.json();
        if (!json.success)
          throw new Error(json.error || "Failed to load updates");
        setUpdates(json.data || []);
      } catch (e) {
        setError(e.message || "Failed to load updates");
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

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
              className="px-4 py-2 rounded-3xl border border-gray-200 shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent"
            />
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium cursor-pointer hover:text-purple-600 transition-colors">
                Log Out
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-7.5 text-gray-800">Updates</h2>

          {error ? <div className="text-red-600 mt-4">{error}</div> : null}

          {/* UPDATES CONTAINER */}
          <div className="mt-4 flex flex-col gap-3">
            {loading ? (
              <div className="text-gray-600">Loading updates...</div>
            ) : updates.length === 0 ? (
              <div className="text-gray-600">No updates yet.</div>
            ) : (
              updates.map((update) => (
                <div
                  key={update.id}
                  className={`p-4 rounded-xl bg-white flex justify-around items-center text-sm border-l-4 ${getUpdateCardStyles(
                    update.type,
                  )}`}
                >
                  <span className="text-xs text-gray-500 min-w-20 mr-2 ">
                    {update.time}
                  </span>

                  <p className="text-gray-700 flex-1">
                    <strong>{update.message.split(":")[0]}:</strong>
                    {update.message.split(":").slice(1).join(":")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;
