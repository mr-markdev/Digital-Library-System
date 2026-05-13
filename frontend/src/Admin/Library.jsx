import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost/Digital-Library-System";
const BOOKS_ENDPOINT = `${API_BASE}/backend/api/books.php`;

const emptyForm = {
  title: "",
  author: "",
  category: "",
  quantity: "",
  status: "available",
};

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(BOOKS_ENDPOINT);
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to load books");
      setBooks(json.data || []);
    } catch (e) {
      setError(e.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchBooks already manages setState safely.
    // Keeping useEffect body minimal to satisfy lint rules.
    (async () => {
      await fetchBooks();
    })();
  }, []);

  const openEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title ?? "",
      author: book.author ?? "",
      category: book.category ?? "",
      quantity: book.quantity ?? 0,
      status: book.status ?? "available",
    });
  };

  const closeEdit = () => {
    setEditingBook(null);
    setFormData(emptyForm);
  };

  const recordUpdate = async (message, type, bookid) => {
    try {
      await fetch(`${API_BASE}/backend/api/books.php?recordUpdate=1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, type, bookid }),
      });
    } catch {
      // ignore recording failures
    }
  };

  const handleSave = async () => {
    if (!editingBook) return;

    const payload = {
      bookid: editingBook.bookid,
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category.trim(),
      quantity: formData.quantity === "" ? 0 : Number(formData.quantity),
      status: formData.status,
    };

    setSaving(true);
    try {
      const res = await fetch(BOOKS_ENDPOINT, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to update book");

      await recordUpdate(
        `Book Updated: "${payload.title}" has been updated in the library.`,
        "success",
        payload.bookid,
      );

      await fetchBooks();
      closeEdit();
    } catch (e) {
      setError(e.message || "Failed to update book");
    } finally {
      setSaving(false);
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
              className="px-4 py-2 rounded-3xl border border-gray-200 shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent"
            />
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium cursor-pointer hover:text-purple-600 transition-colors">
                Log Out
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-gray-800">Library</h2>

          {error ? <div className="text-red-600 mb-4">{error}</div> : null}

          <div className="bg-white rounded-[15px] p-5 mt-5 shadow-sm overflow-x-auto">
            {loading ? (
              <div className="text-gray-600">Loading books...</div>
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
                        <button
                          onClick={() => openEdit(book)}
                          className="bg-transparent border border-purple-600 text-purple-600 px-3 py-1.5 rounded-md cursor-pointer hover:bg-purple-600 hover:text-white transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* EDIT MODAL */}
          {editingBook ? (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-xl rounded-[15px] shadow-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Edit Book</h3>
                  <button
                    onClick={closeEdit}
                    className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="form-group">
                    <label className="text-sm mb-1.5 text-gray-600">
                      Book Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5a3ec8]"
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-sm mb-1.5 text-gray-600">
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5a3ec8]"
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-sm mb-1.5 text-gray-600">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
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
                    <label className="text-sm mb-1.5 text-gray-600">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5a3ec8]"
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-sm mb-1.5 text-gray-600">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5a3ec8]"
                    >
                      <option value="available">Available</option>
                      <option value="out">Out of Stock</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={closeEdit}
                      disabled={saving}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg cursor-pointer font-bold hover:bg-gray-200 transition-colors disabled:opacity-60"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={async () => {
                        if (!editingBook) return;
                        if (!confirm(`Delete "${editingBook.title}"?`)) return;
                        try {
                          const res = await fetch(BOOKS_ENDPOINT, {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              bookid: editingBook.bookid,
                            }),
                          });
                          const json = await res.json();
                          if (!json.success)
                            throw new Error(
                              json.error || "Failed to delete book",
                            );

                          try {
                            await recordUpdate(
                              `Book Deleted: "${editingBook.title}" has been removed from the library.`,
                              "danger",
                              editingBook.bookid,
                            );
                          } catch {
                            // ignore recording failures
                          }

                          await fetchBooks();
                          closeEdit();
                        } catch (e) {
                          setError(e.message || "Failed to delete book");
                        }
                      }}
                      disabled={saving}
                      className="flex-1 py-3 bg-red-500 text-white rounded-lg cursor-pointer font-bold hover:bg-red-600 transition-colors disabled:opacity-60"
                    >
                      Delete
                    </button>

                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 py-3 bg-[#5a3ec8] text-white rounded-lg cursor-pointer font-bold hover:bg-[#4329a8] transition-colors disabled:opacity-60"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Library;
