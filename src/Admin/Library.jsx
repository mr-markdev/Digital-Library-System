import React from "react";
import { Link } from "react-router-dom";

const Library = () => {
  // Sample book data to match the original table
  const books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Classic",
      quantity: 5,
      status: "available",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-Help",
      quantity: 0,
      status: "out",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      category: "Fantasy",
      quantity: 12,
      status: "available",
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      category: "Productivity",
      quantity: 3,
      status: "available",
    },
    {
      title: "1984",
      author: "George Orwell",
      category: "Dystopian",
      quantity: 0,
      status: "out",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Fiction",
      quantity: 8,
      status: "available",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Tech",
      quantity: 2,
      status: "available",
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      category: "History",
      quantity: 15,
      status: "available",
    },
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      category: "Psychology",
      quantity: 4,
      status: "available",
    },
    {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      category: "Thriller",
      quantity: 0,
      status: "out",
    },
    {
      title: "Educated",
      author: "Tara Westover",
      category: "Memoir",
      quantity: 6,
      status: "available",
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      category: "Dystopian",
      quantity: 9,
      status: "available",
    },
    {
      title: "The Psych of Money",
      author: "Morgan Housel",
      category: "Finance",
      quantity: 11,
      status: "available",
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      category: "Sci-Fi",
      quantity: 7,
      status: "available",
    },
    {
      title: "Zero to One",
      author: "Peter Thiel",
      category: "Business",
      quantity: 1,
      status: "available",
    },
    {
      title: "Circe",
      author: "Madeline Miller",
      category: "Mythology",
      quantity: 0,
      status: "out",
    },
    {
      title: "The 5AM Club",
      author: "Robin Sharma",
      category: "Self-Help",
      quantity: 10,
      status: "available",
    },
    {
      title: "Becoming",
      author: "Michelle Obama",
      category: "Biography",
      quantity: 4,
      status: "available",
    },
    {
      title: "Life 3.0",
      author: "Max Tegmark",
      category: "Tech",
      quantity: 3,
      status: "available",
    },
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      category: "Psychology",
      quantity: 5,
      status: "available",
    },
  ];

  return (
    <div className="min-h-screen bg-[#e8dcf0] p-5">
      <div className="w-[95%] mx-auto bg-gray-100 rounded-[20px] flex overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-[230px] bg-white p-5 shrink-0">
          <h2 className="text-2xl font-bold mb-5">Admin</h2>

          <div className="text-sm font-medium text-gray-500 mb-3 mt-4">
            Admin Menu
          </div>
          <ul className="list-none space-y-2.5">
            <Link to="/" className="block text-decoration-none text-gray-700">
              <li className="p-2.5 rounded-[10px] hover:bg-purple-100 hover:text-[#5a3ec8] cursor-pointer transition-colors">
                Dashboard
              </li>
            </Link>
            <a
              href="LIBMANLibrary.html"
              className="block text-decoration-none text-gray-700"
            >
              <li className="p-2.5 rounded-[10px] bg-purple-100 text-[#5a3ec8] font-medium cursor-pointer transition-colors">
                Library
              </li>
            </a>
            <Link
              to="/updates"
              className="block text-decoration-none text-gray-700"
            >
              <li className="p-2.5 rounded-[10px] hover:bg-purple-100 hover:text-[#5a3ec8] cursor-pointer transition-colors">
                Updates
              </li>
            </Link>
            <Link
              to="/borrowers"
              className="block text-decoration-none text-gray-700"
            >
              <li className="p-2.5 rounded-[10px] hover:bg-purple-100 hover:text-[#5a3ec8] cursor-pointer transition-colors">
                Borrowers List
              </li>
            </Link>
            <Link
              to="/addnewbook"
              className="block text-decoration-none text-gray-700"
            >
              <li className="p-2.5 rounded-[10px] hover:bg-purple-100 hover:text-[#5a3ec8] cursor-pointer transition-colors">
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
                    key={index}
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
                        className={`px-3 py-1 rounded-full text-xs font-bold ${book.status === "available" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
