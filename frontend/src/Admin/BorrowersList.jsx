import { Link } from "react-router-dom";

const BorrowersList = () => {
  const borrowers = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      email: "juan@example.com",
      phone: "+63 912 345 6789",
      booksBorrowed: 3,
      dueDate: "May 15, 2024",
      status: "Active",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@example.com",
      phone: "+63 923 456 7890",
      booksBorrowed: 2,
      dueDate: "May 18, 2024",
      status: "Active",
    },
    {
      id: 3,
      name: "Kevin Torres",
      email: "kevin@example.com",
      phone: "+63 934 567 8901",
      booksBorrowed: 1,
      dueDate: "May 20, 2024",
      status: "Active",
    },
    {
      id: 4,
      name: "Ana Reyes",
      email: "ana@example.com",
      phone: "+63 945 678 9012",
      booksBorrowed: 0,
      dueDate: "-",
      status: "Cleared",
    },
    {
      id: 5,
      name: "Carlos Mendoza",
      email: "carlos@example.com",
      phone: "+63 956 789 0123",
      booksBorrowed: 4,
      dueDate: "May 10, 2024",
      status: "Overdue",
    },
    {
      id: 6,
      name: "Liza Fernandez",
      email: "liza@example.com",
      phone: "+63 967 890 1234",
      booksBorrowed: 1,
      dueDate: "May 22, 2024",
      status: "Active",
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      case "Cleared":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
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
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium">
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
              <li className="p-2.5 rounded-xl cursor-pointer transition-all hover:bg-purple-100 hover:text-purple-600 font-medium bg-purple-100 text-purple-600">
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

          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Borrowers List
          </h2>

          {/* TABLE CONTAINER */}
          <div className="bg-white rounded-[15px] p-5 mt-5 shadow-sm overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    Books Borrowed
                  </th>
                  <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="p-4 border-b-2 border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {borrowers.map((borrower) => (
                  <tr
                    key={borrower.id}
                    className="hover:bg-green-50/30 transition-colors"
                  >
                    <td className="p-4 border-b border-gray-50 text-gray-800 font-medium">
                      {borrower.name}
                    </td>
                    <td className="p-4 border-b border-gray-50 text-gray-600">
                      {borrower.email}
                    </td>
                    <td className="p-4 border-b border-gray-50 text-gray-600">
                      {borrower.phone}
                    </td>
                    <td className="p-4 border-b border-gray-50 text-gray-600">
                      {borrower.booksBorrowed}
                    </td>
                    <td className="p-4 border-b border-gray-50 text-gray-600">
                      {borrower.dueDate}
                    </td>
                    <td className="p-4 border-b border-gray-50">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyles(borrower.status)}`}
                      >
                        {borrower.status}
                      </span>
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

export default BorrowersList;
