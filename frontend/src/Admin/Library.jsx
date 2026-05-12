import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost/Digital-Library-System";
const BOOKS_ENDPOINT = `${API_BASE}/backend/api/books.php`;

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(BOOKS_ENDPOINT);
        const json = await res.json();
        if (!json.success)
          throw new Error(json.error || "Failed to load books");
        setBooks(json.data || []);
      } catch (e) {
        setError(e.message || "Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium bg-purple-100 text-purple-600">
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
              className="py-2 px-4 rounded-full w-[250px] border-none focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <div className="flex items-center gap-2.5">
              <span className="text-gray-700">Log Out</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-gray-800">Library</h2>

          {/* TABLE CONTAINER */}
          <div className="bg-white rounded-[15px] p-5 mt-5 shadow-sm overflow-x-auto">
            {loading ? (
              <div className="text-gray-600">Loading books...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      Title
                    </th>
                    <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      Author
                    </th>
                    <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      Category
                    </th>
                    <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr
                      key={book.bookid ?? index}
                      className="hover:bg-green-50/30 transition-colors"
                    >
                      <td className="p-4 border-b border-gray-50 text-gray-800 font-medium">
                        {book.title}
                      </td>
                      <td className="p-4 border-b border-gray-50 text-gray-600">
                        {book.author}
                      </td>
                      <td className="p-4 border-b border-gray-50 text-gray-600">
                        {book.category}
                      </td>
                      <td className="p-4 border-b border-gray-50 text-gray-600">
                        {book.quantity}
                      </td>
                      <td className="p-4 border-b border-gray-50">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            book.status === "available"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {book.status === "available"
                            ? "Available"
                            : "Out of Stock"}
                        </span>
                      </td>
                      <td className="p-4 border-b border-gray-50">
                        <button className="bg-transparent border border-purple-600 text-purple-600 px-3 py-1.5 rounded-md cursor-pointer hover:bg-purple-600 hover:text-white transition-colors">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
