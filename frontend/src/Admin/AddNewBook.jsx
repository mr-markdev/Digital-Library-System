import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost/digital-library-system";
const BOOKS_ENDPOINT = `${API_BASE}/backend/api/books.php`;

const AddNewBook = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
    status: "available",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        ...formData,
        quantity: formData.quantity === "" ? 0 : Number(formData.quantity),
        // Map UI status 'out' -> backend status 'out' (kept as-is)
        status: formData.status,
      };

      const res = await fetch(BOOKS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to add book");

      // Record dashboard update
      try {
        const message = `New Book Added: "${formData.title}" has been added to the library.`;
        const recordRes = await fetch(
          `${API_BASE}/backend/api/books.php?recordUpdate=1`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message,
              type: "info",
              bookid: json?.data?.bookid ?? null,
            }),
          },
        );
        await recordRes.json();
        // ignore record failure
      } catch {
        // ignore
        void 0;
      }

      // Go to library so the newly added book is displayed.
      navigate("/library");
    } catch (e2) {
      setError(e2.message || "Failed to add book");
    } finally {
      setSubmitting(false);
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
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium bg-purple-100 text-purple-600">
                Add New Books
              </li>
            </Link>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-5">
          {/* TOPBAR */}

          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Add New Book
          </h2>

          {/* FORM CONTAINER */}
          <div className="bg-white p-[30px] rounded-[15px] shadow-sm">
            {error ? <div className="text-red-600 mb-4">{error}</div> : null}
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
                disabled={submitting}
                className="w-full py-3 bg-[#5a3ec8] text-white rounded-lg cursor-pointer font-bold hover:bg-[#4329a8] transition-colors disabled:opacity-60"
              >
                {submitting ? "Adding..." : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBook;
