import React, { useEffect, useState } from 'react';
import {
  fetchDirectSponsorIncome,
  fetchFighterIncome,
  fetchMatchingIncome
} from '../../Api/userService';

const IncomePage = () => {
  const [directIncome, setDirectIncome] = useState(null);
  const [fighterIncome, setFighterIncome] = useState(null);
  const [matchingIncome, setMatchingIncome] = useState(null);

  useEffect(() => {
    fetchDirectSponsorIncome().then(setDirectIncome);
    fetchFighterIncome().then(setFighterIncome);
    fetchMatchingIncome().then(setMatchingIncome);
  }, []);

  const renderLogs = (logs) => (
    <ul className="list-disc pl-4 space-y-2">
      {logs.map((log) => (
        <li key={log._id} className="text-sm bg-gray-50 p-2 rounded-md shadow-sm">
          <div><strong>Amount:</strong> ₹{log.amount}</div>
          <div><strong>From:</strong> {log.from_user?.full_name || 'N/A'} ({log.from_user?.username})</div>
          <div><strong>Mobile:</strong> {log.from_user?.mobile}</div>
          <div><strong>Date:</strong> {new Date(log.date).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Direct Sponsor Income Section */}
      <section className="border rounded-lg shadow p-5 bg-white">
        <h2 className="text-2xl font-bold text-blue-600 mb-3">Direct Sponsor Income</h2>
        {!directIncome ? (
          <p>Loading...</p>
        ) : (
          <>
            <p><strong>Total Income:</strong> ₹{directIncome.total}</p>
            <h3 className="mt-4 font-semibold text-gray-700">Sponsor Logs:</h3>
            {renderLogs(directIncome.logs)}
          </>
        )}
      </section>

      {/* Fighter Income Section */}
      <section className="border rounded-lg shadow p-5 bg-white">
        <h2 className="text-2xl font-bold text-green-600 mb-3">Fighter Income</h2>
        {!fighterIncome ? (
          <p>Loading...</p>
        ) : (
          <>
            <p><strong>Total Income:</strong> ₹{fighterIncome.total}</p>
            <h3 className="mt-4 font-semibold text-gray-700">Fighter Logs:</h3>
            {renderLogs(fighterIncome.logs)}
          </>
        )}
      </section>

      {/* Matching Income Section */}
      <section className="border rounded-lg shadow p-5 bg-white">
        <h2 className="text-2xl font-bold text-purple-600 mb-3">Matching Income</h2>
        {!matchingIncome ? (
          <p>Loading...</p>
        ) : (
          <>
            <p><strong>Total Income:</strong> ₹{matchingIncome.total}</p>
            <h3 className="mt-4 font-semibold text-gray-700">Matching Logs:</h3>
            {renderLogs(matchingIncome.logs)}
          </>
        )}
      </section>
    </div>
  );
};

export default IncomePage;
