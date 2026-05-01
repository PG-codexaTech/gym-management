"use client";

import React, { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Batman",
    age: 30,
    email: "batman@gmail.com",
    address: {
      city: "Pune",
    },
  });
  const handleUser = () => {
    setUser({
      ...user,
      name: "clark",
      address: {
        ...user.address,
        city: "Nagpur",
      },
    });
  };
  return (
    <div className="text-white">
      <h2>{user.name}</h2>
      <h2>{user.age}</h2>
      <h2>{user.email}</h2>
      <h2>{user.address.city}</h2>
      <button
        onClick={handleUser}
        className="w-40 bg-green-500 rounded-2xl p-2"
      >
        Update
      </button>
    </div>
  );
};

export default UserProfile;
