import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

const dummyOwners: User[] = [
  { id: 1, name: 'Owner One', email: 'owner1@example.com', phone: '0771234567', status: 'verify' },
  { id: 2, name: 'Owner Two', email: 'owner2@example.com', phone: '0777654321', status: 'suspend' },
];

const dummyCustomers: User[] = [
  { id: 3, name: 'Customer One', email: 'customer1@example.com', phone: '0711111111', status: 'verify' },
  { id: 4, name: 'Customer Two', email: 'customer2@example.com', phone: '0712222222', status: 'delete' },
];

const ManageAccounts: React.FC = () => {
  const [view, setView] = useState<'owner' | 'customer'>('owner');
  const [owners, setOwners] = useState<User[]>(dummyOwners);
  const [customers, setCustomers] = useState<User[]>(dummyCustomers);

  const handleStatusChange = (userType: 'owner' | 'customer', id: number, newStatus: string) => {
    const updater = userType === 'owner' ? setOwners : setCustomers;
    const currentData = userType === 'owner' ? owners : customers;

    const updated = currentData.map((user) =>
      user.id === id ? { ...user, status: newStatus } : user
    );

    updater(updated);
  };

  const renderTable = (data: User[], type: 'owner' | 'customer') => (
    <table className="min-w-full table-auto border border-gray-300 mt-4">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Verification</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id} className="text-center">
            <td className="border p-2">{user.id}</td>
            <td className="border p-2">{user.name}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.phone}</td>
            <td className="border p-2">
              <select
                value={user.status}
                onChange={(e) => handleStatusChange(type, user.id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="verify">verify</option>
                <option value="suspend">suspend</option>
                <option value="delete">delete</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Owner & Customer Accounts</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView('owner')}
          className={`px-4 py-2 rounded ${view === 'owner' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Owner Details
        </button>
        <button
          onClick={() => setView('customer')}
          className={`px-4 py-2 rounded ${view === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Customer Details
        </button>
      </div>

      {view === 'owner' ? renderTable(owners, 'owner') : renderTable(customers, 'customer')}
    </div>
  );
};

export default ManageAccounts;
