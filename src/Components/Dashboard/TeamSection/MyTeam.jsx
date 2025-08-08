import React, { useEffect, useState } from "react";
import api from "../../../../utils/api";
const MyTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/user/myteam")
      .then((res) => {
        
      console.log(res);
        
        setTeam(res.data.data)
      
      })
      .catch((err) => console.error("Failed to fetch team:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Team</h2>
      {loading ? (
        <p>Loading team data...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border">#</th>
                <th className="text-left px-4 py-2 border">Name</th>
                <th className="text-left px-4 py-2 border">Username</th>
                <th className="text-left px-4 py-2 border">Mobile</th>
                <th className="text-left px-4 py-2 border">Joined</th>
              </tr>
            </thead>
            <tbody>
              {team.map((user, idx) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">{user.full_name}</td>
                  <td className="px-4 py-2 border">{user.username}</td>
                  <td className="px-4 py-2 border">{user.mobile}</td>
                  <td className="px-4 py-2 border">{new Date(user.crt_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTeam;
