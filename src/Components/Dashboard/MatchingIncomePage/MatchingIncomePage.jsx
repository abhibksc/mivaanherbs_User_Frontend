import React, { useEffect, useState } from 'react';
import { fetchMatchingIncome } from '../../Api/userService';

const MatchingIncomePage = () => {
  const [incomeDetails, setIncomeDetails] = useState(null);

  useEffect(() => {
    fetchMatchingIncome().then(setIncomeDetails);
  }, []);

  if (!incomeDetails) return <p>Loading Matching Income...</p>;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Matching Income</h2>
      <p><strong>Total Income:</strong> ₹{incomeDetails.total}</p>

      <h3 className="mt-4 font-semibold">Matching Logs:</h3>
      <ul className="list-disc pl-4 space-y-2">
        {incomeDetails.logs.map((log) => (
          <li key={log._id} className="text-sm">
            <div><strong>Amount:</strong> ₹{log.amount}</div>
            <div><strong>From:</strong> {log.from_user?.full_name || 'N/A'} ({log.from_user?.username})</div>
            <div><strong>Mobile:</strong> {log.from_user?.mobile}</div>
            <div><strong>Date:</strong> {new Date(log.date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchingIncomePage;
