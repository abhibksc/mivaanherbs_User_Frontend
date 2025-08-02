import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">My Team Structure</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* My Team Card */}
        <div
          onClick={() => navigate('/dashboard/my-team')}
          className="cursor-pointer bg-green-100 hover:bg-green-200 transition-all p-6 rounded-xl shadow hover:shadow-lg flex flex-col items-center"
        >
          <h3 className="text-xl font-bold text-green-700 mb-2">My Team</h3>
          <p className="text-sm text-green-800 text-center">View all your team members in tabular format including name, rank, join date, and more.</p>
        </div>

        {/* My Geology Card */}
        <div
          onClick={() => navigate('/dashboard/mygeo')}
          className="cursor-pointer bg-blue-100 hover:bg-blue-200 transition-all p-6 rounded-xl shadow hover:shadow-lg flex flex-col items-center"
        >
          <h3 className="text-xl font-bold text-blue-700 mb-2">My Geology</h3>
          <p className="text-sm text-blue-800 text-center">Explore your team’s downline in a structured tree view format.</p>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
