/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

type User = {
  id: number;
  email: string;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  bio?: string | null;
  location?: string | null;
  profile_picture?: string | null;
  created_at: string;
};

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // To toggle between viewing and editing
  const [formData, setFormData] = useState<User | null>(null); // For the edit form

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3000/api/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setUser(data.user);
        setFormData(data.user); // Prepopulate form with user data
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData ? { ...prevData, [name]: value } : prevData
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/api/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setUser(formData); // Update the displayed profile with new data
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Or use navigate if in a react-router context
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(user); // Reset form to original data
  };

  return {
    user,
    loading,
    error,
    isEditing,
    formData,
    handleInputChange,
    handleSubmit,
    handleLogout,
    handleEditClick,
    handleCancelClick,
  };
};
