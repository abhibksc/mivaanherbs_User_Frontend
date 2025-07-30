import React, { useEffect, useState } from 'react';
import { fetchIncomeLogs } from '../../Api/userService';

const AllIncomeLogsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchIncomeLogs().then((data) => {
      setLogs(data.logs || []);
    });
  }, []);

  if (!logs.length) return <p>Loading Income Logs...</p>;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">All Income Logs</h2>
      <ul className="divide-y divide-gray-200">
        {logs.map((log) => (
          <li key={log._id} className="py-2 text-sm">
            <div><strong>Type:</strong> {log.type}</div>
            <div><strong>Amount:</strong> ₹{log.amount}</div>
            <div>
              <strong>From:</strong> {log.from_user?.full_name || 'N/A'} ({log.from_user?.username})
            </div>
            <div><strong>Mobile:</strong> {log.from_user?.mobile}</div>
            <div><strong>Date:</strong> {new Date(log.date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllIncomeLogsPage;
