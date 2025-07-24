import type React from "react";
import { useState } from "react";
import { Users, Calendar, DollarSign, AlertCircle, Eye, Edit, Trash2, MoreHorizontal, Car } from "lucide-react";
import { mockVehicles } from "../../data/mockData"; // Import mockVehicles

const dummyData = {
  totalUsers: 120,
  totalBookings: 75,
  totalRevenue: 15800,
  pendingVerifications: 8,
  totalVehicles: mockVehicles.length, // Updated to use mockVehicles length
};

// Map mockVehicles to the structure expected by the vehicles table
const vehicles = mockVehicles.map((vehicle) => ({
  id: vehicle.id,
  images: vehicle.images, // Keep the images array for rendering the first image
  name: vehicle.name, // Already includes brand, model, and year
  brand: vehicle.brand,
  type: vehicle.type,
  location: vehicle.location,
  availability: `${new Date(vehicle.availability.from).toLocaleDateString()} to ${new Date(vehicle.availability.to).toLocaleDateString()}`, // Format availability
  fuelType: vehicle.fuelType,
}));

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

interface DropdownMenuProps {
  children: React.ReactNode;
  onAction: (action: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-100 rounded-md transition-colors">
        <MoreHorizontal className="h-5 w-5" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              <div className="px-3 py-2 text-base font-medium text-gray-900 border-b border-gray-100">Actions</div>
              <button
                onClick={() => {
                  onAction("view");
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-base text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Details
              </button>
              <button
                onClick={() => {
                  onAction("edit");
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-base text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Edit className="mr-2 h-5 w-5" />
                Edit
              </button>
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() => {
                  onAction("delete");
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-base text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "verify":
    case "available":
      return "bg-green-100 text-green-800 border-green-200";
    case "suspend":
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "delete":
    case "unavailable":
      return "bg-red-100 text-red-800 border-red-200";
    case "rented":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getFuelTypeColor = (fuelType: string) => {
  switch (fuelType.toLowerCase()) {
    case "electric":
      return "bg-green-100 text-green-800 border-green-200";
    case "hybrid":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "petrol":
    case "gasoline":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "diesel":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const AdminDashboard: React.FC = () => {
  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} action for user ${userId}`);
    // Implement your action logic here
  };

  const handleBookingAction = (action: string, bookingId: string) => {
    console.log(`${action} action for booking ${bookingId}`);
    // Implement your action logic here
  };

  const handleVehicleAction = (action: string, vehicleId: string) => {
    console.log(`${action} action for vehicle ${vehicleId}`);
    // Implement your action logic here
  };

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-lg text-gray-600 mt-1">Welcome back! Here's what's happening with your rental platform.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{dummyData.totalUsers}</p>
              <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Users className="h-7 w-7 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Vehicles Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600">Total Vehicles</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{dummyData.totalVehicles}</p>
              <p className="text-sm text-gray-500 mt-1">+5% from last month</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Car className="h-7 w-7 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{dummyData.totalBookings}</p>
              <p className="text-sm text-gray-500 mt-1">+8% from last month</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Calendar className="h-7 w-7 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">${dummyData.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <DollarSign className="h-7 w-7 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Pending Verifications Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600">Pending Verifications</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{dummyData.pendingVerifications}</p>
              <p className="text-sm text-gray-500 mt-1">Requires attention</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Vehicles</h2>
              <p className="text-base text-gray-600 mt-1">Manage and monitor all vehicles in your rental fleet</p>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white text-base font-medium rounded-md hover:bg-purple-700 transition-colors">
              View All Vehicles
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle Id
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Fuel Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-12"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base font-medium text-gray-900">{vehicle.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={vehicle.images[0]}
                      alt={vehicle.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-900">{vehicle.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      {vehicle.brand}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">{vehicle.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">{vehicle.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">{vehicle.availability}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border ${getFuelTypeColor(vehicle.fuelType)}`}
                    >
                      {vehicle.fuelType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                    <DropdownMenu onAction={(action) => handleVehicleAction(action, vehicle.id)}>
                      <div />
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Accounts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">User Accounts</h2>
              <p className="text-base text-gray-600 mt-1">Manage and monitor user accounts across your platform</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 transition-colors">
              View All Users
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-12"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userAccounts.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base font-medium text-gray-900">{user.fullName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-600">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200 capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">{user.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border capitalize ${getStatusStyles(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                    <DropdownMenu onAction={(action) => handleUserAction(action, user.id)}>
                      <div />
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
              <p className="text-base text-gray-600 mt-1">Latest booking activities on your platform</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 transition-colors">
              View All Bookings
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Booked By
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-12"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base font-medium text-gray-900">{booking.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-900">{booking.vehicleName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-600">{booking.owner}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-900">{new Date(booking.startDate).toLocaleDateString()}</div>
                    <div className="text-base text-gray-500">to {new Date(booking.endDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base font-medium text-gray-900">${booking.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-900">{booking.bookedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                    <DropdownMenu onAction={(action) => handleBookingAction(action, booking.id)}>
                      <div />
                    </DropdownMenu>
                  </td>
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