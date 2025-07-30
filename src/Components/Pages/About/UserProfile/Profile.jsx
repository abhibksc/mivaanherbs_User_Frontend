import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getProfile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("Failed to fetch profile", err);
      });
  }, []);

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:flex items-center space-y-6 md:space-y-0 md:space-x-10">
        {/* Profile Image */}
        <div className="flex-shrink-0 w-full md:w-48 flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1677094310956-7f88ae5f5c6b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={user?.full_name || "User"}
            className="w-40 h-40 rounded-full object-cover border-4 border-green-600"
          />
        </div>

        {/* Profile Info */}
        <div className="text-center md:text-left w-full">
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.full_name || "John Doe"}
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            {user?.email || "johndoe@email.com"}
          </p>
          {user?.mobile && (
            <p className="text-sm text-gray-500 mb-2">📞 {user.mobile}</p>
          )}
          <p className="text-gray-700">
            {user?.bio || "This is a short bio about the user."}
          </p>

          <div className="mt-4 flex justify-center md:justify-start gap-4">
            <a
              //   href="/edit-profile"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-full text-sm font-semibold transition"
            >
              Edit Profile
            </a>
            <a
              //   href="/settings"
              className="border border-green-600 text-green-600 hover:bg-green-50 py-2 px-5 rounded-full text-sm font-semibold transition"
            >
              Settings
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
