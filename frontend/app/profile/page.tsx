"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Profile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<Profile | null>(null);

  useEffect(() => {
    // Fetch user details when component mounts
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserDetails(data); // Set user details in state
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">User Profile</h2>
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Username:</strong>
              <p>{userDetails?.username}</p>
            </div>
            <div className="col-md-6">
              <strong>First Name:</strong>
              <p>{userDetails?.firstName}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Last Name:</strong>
              <p>{userDetails?.lastName}</p>
            </div>
            <div className="col-md-6">
              <strong>Email:</strong>
              <p>{userDetails?.email}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Phone Number:</strong>
              <p>{userDetails?.phoneNumber}</p>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
