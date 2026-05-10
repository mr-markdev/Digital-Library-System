import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddNewBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
    status: "available",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book added:", formData);
  };

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
            <Link
              to="/library"
              className="block text-decoration-none text-gray-700"
            >
              <li className="p-2.5 rounded-[10px] hover:bg-purple-100 hover:text-[#5a3ec8] cursor-pointer transition-colors">
                Library
              </li>
            </Link>
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
            <a
              href="LIBMANAddNewBook.html"
              className="block text-decoration-none text-gray-700"
            >
              <li className="p-2.5 rounded-[10px] bg-purple-100 text-[#5a3ec8] font-medium cursor-pointer transition-colors">
                Add New Books
              </li>
            </a>
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

          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Add New Book
          </h2>

          {/* FORM CONTAINER */}
          <div className="bg-white p-[30px] rounded-[15px] shadow-sm h-[calc(100vh-180px)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-group">
                <label className="text-sm mb-1.5 text-gray-600">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5a3ec8]"
                />
              </div>

              <div className="form-group">
                <label className="text-sm mb-1.5 text-gray-600">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5a3ec8]"
                />
              </div>

              <div className="form-group">
                <label className="text-sm mb-1.5 text-gray-600">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5a3ec8]"
                >
                  <option value="">Select category</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="science">Science</option>
                  <option value="technology">Technology</option>
                  <option value="history">History</option>
                  <option value="biography">Biography</option>
                </select>
              </div>

              <div className="form-group">
                <label className="text-sm mb-1.5 text-gray-600">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5a3ec8]"
                />
              </div>

              <div className="form-group">
                <label className="text-sm mb-1.5 text-gray-600">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5a3ec8]"
                >
                  <option value="available">Available</option>
                  <option value="out">Out of Stock</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#5a3ec8] text-white rounded-lg cursor-pointer font-bold hover:bg-[#4329a8] transition-colors"
              >
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBook;
