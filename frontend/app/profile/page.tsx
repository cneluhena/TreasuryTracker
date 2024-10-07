"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Profile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string; // Optional profile image field
}

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    // Fetch user details when component mounts
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission to update profile
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchUserDetails(); // Fetch updated user details
        setIsEditing(false); // Exit edit mode
        alert("Profile updated successfully!");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">User Profile</h2>

          {userDetails?.profileImage && (
            <div className="text-center mb-3">
              <img
                src={process.env.NEXT_PUBLIC_API_URL+`/uploads/${userDetails.profileImage}`}
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}

          {!isEditing ? (
            <div>
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
              <div className="row">
                <div className="col text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    First Name
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Last Name
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Email
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Phone Number
                    <input
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              <button className="btn btn-success" type="submit">
                Save Changes
              </button>
              <button
                className="btn btn-secondary ml-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
