import React from "react";

const dummyData = {
  totalUsers: 120,
  totalBookings: 75,
  totalRevenue: 15800,
  pendingVerifications: 8,
};

const userAccounts = [
  {
    id: "U001",
    fullName: "Alice Brown",
    email: "alice@example.com",
    role: "customer",
    joinedDate: "2024-01-10",
    location: "New York",
    status: "verify",
  },
  {
    id: "U002",
    fullName: "Tom Hardy",
    email: "tom@example.com",
    role: "owner",
    joinedDate: "2024-02-18",
    location: "Los Angeles",
    status: "suspend",
  },
  {
    id: "U003",
    fullName: "Diana Prince",
    email: "diana@example.com",
    role: "customer",
    joinedDate: "2023-12-05",
    location: "Chicago",
    status: "verify",
  },
  {
    id: "U004",
    fullName: "Bruce Wayne",
    email: "bruce@example.com",
    role: "owner",
    joinedDate: "2024-03-12",
    location: "Gotham",
    status: "delete",
  },
  {
    id: "U005",
    fullName: "Clark Kent",
    email: "clark@example.com",
    role: "customer",
    joinedDate: "2024-04-08",
    location: "Metropolis",
    status: "verify",
  },
];

const recentBookings = [
  {
    id: "B001",
    vehicleName: "Toyota Prius",
    owner: "John Smith",
    startDate: "2025-07-20",
    endDate: "2025-07-22",
    price: 150,
    bookedBy: "Alice Brown",
  },
  {
    id: "B002",
    vehicleName: "Honda Civic",
    owner: "Sarah Lee",
    startDate: "2025-07-19",
    endDate: "2025-07-21",
    price: 180,
    bookedBy: "Tom Hardy",
  },
  {
    id: "B003",
    vehicleName: "Tesla Model 3",
    owner: "Michael Ray",
    startDate: "2025-07-18",
    endDate: "2025-07-20",
    price: 250,
    bookedBy: "Diana Prince",
  },
  {
    id: "B004",
    vehicleName: "Ford Ranger",
    owner: "James Dean",
    startDate: "2025-07-17",
    endDate: "2025-07-19",
    price: 140,
    bookedBy: "Bruce Wayne",
  },
  {
    id: "B005",
    vehicleName: "BMW X5",
    owner: "Peter Parker",
    startDate: "2025-07-15",
    endDate: "2025-07-17",
    price: 300,
    bookedBy: "Clark Kent",
  },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{dummyData.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Bookings</h2>
          <p className="text-3xl font-bold text-green-600">{dummyData.totalBookings}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Revenue</h2>
          <p className="text-3xl font-bold text-yellow-600">${dummyData.totalRevenue}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Pending Verifications</h2>
          <p className="text-3xl font-bold text-red-600">{dummyData.pendingVerifications}</p>
        </div>
      </div>

      {/* User Accounts Table */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">User Accounts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600">
                <th className="px-4 py-2 border-b">Full Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Role</th>
                <th className="px-4 py-2 border-b">Joined Date</th>
                <th className="px-4 py-2 border-b">Location</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {userAccounts.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{user.fullName}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b capitalize">{user.role}</td>
                  <td className="px-4 py-2 border-b">{user.joinedDate}</td>
                  <td className="px-4 py-2 border-b">{user.location}</td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "verify"
                          ? "bg-green-100 text-green-700"
                          : user.status === "suspend"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600">
                <th className="px-4 py-2 border-b">Booking ID</th>
                <th className="px-4 py-2 border-b">Vehicle</th>
                <th className="px-4 py-2 border-b">Owner</th>
                <th className="px-4 py-2 border-b">Start Date</th>
                <th className="px-4 py-2 border-b">End Date</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Booked By</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{booking.id}</td>
                  <td className="px-4 py-2 border-b">{booking.vehicleName}</td>
                  <td className="px-4 py-2 border-b">{booking.owner}</td>
                  <td className="px-4 py-2 border-b">{booking.startDate}</td>
                  <td className="px-4 py-2 border-b">{booking.endDate}</td>
                  <td className="px-4 py-2 border-b">${booking.price}</td>
                  <td className="px-4 py-2 border-b">{booking.bookedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
