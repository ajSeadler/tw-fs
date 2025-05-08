import { MapPin, Settings } from "lucide-react";
import { useUserProfile } from "../api/useUserProfile";
import FavoriteEvents from "./FavoriteEvents";

export const Profile = () => {
  const {
    user,
    loading,
    error,
    isEditing,
    formData,
    handleInputChange,
    handleSubmit,
    handleEditClick,
    handleCancelClick,
  } = useUserProfile();

  if (loading) return <div className="p-4 text-gray-400">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-black px-4 py-12 flex flex-col items-center">
      {/* Profile Card */}
      <div className="relative w-full max-w-3xl rounded-2xl shadow-xl p-8">
        {/* Settings Icon */}
        <button
          onClick={handleEditClick}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <Settings size={24} />
        </button>

        <div className="flex items-center space-x-4 mb-8">
          {user?.profile_picture ? (
            <img
              src={user.profile_picture}
              alt="Profile"
              className="w-20 h-20 rounded-full border border-neutral-700 object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-neutral-700 flex items-center justify-center text-white text-xl font-semibold">
              {user?.first_name?.[0] ?? "?"}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-gray-400">@{user?.username}</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300">Username</label>
                <input
                  name="username"
                  value={formData?.username || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full bg-neutral-700 text-white p-2 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">
                  First Name
                </label>
                <input
                  name="first_name"
                  value={formData?.first_name || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full bg-neutral-700 text-white p-2 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Last Name</label>
                <input
                  name="last_name"
                  value={formData?.last_name || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full bg-neutral-700 text-white p-2 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Email</label>
                <input
                  name="email"
                  value={formData?.email || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full bg-neutral-700 text-white p-2 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Location</label>
                <input
                  name="location"
                  value={formData?.location || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full bg-neutral-700 text-white p-2 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Bio</label>
                <input
                  name="bio"
                  value={formData?.bio || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full bg-neutral-700 text-white p-2 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">
                  Profile Picture URL
                </label>
                <input
                  name="profile_picture"
                  value={formData?.profile_picture || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full bg-neutral-700 text-white p-2 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleCancelClick}
                className="px-4 py-2 text-sm rounded-md border border-gray-400 text-gray-300 hover:bg-neutral-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded-md border-2 border-green-500 text-green-400 hover:bg-neutral-700 transition font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="text-gray-300 space-y-4">
            <p>{user?.bio || "N/A"}</p>
            <p className="flex-row flex gap-1 text-gray-400">
              <span className="text-gray-400 font-semibold text-sm">
                <MapPin />
              </span>{" "}
              {user?.location || "N/A"}
            </p>
            <p className="text-gray-400 font-semibold text-sm">
              Member Since: {new Date(user!.created_at).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Favorite Events Positioned Below */}
      <div className="w-full max-w-4xl mt-12">
        <h2 className="text-2xl font-semibold text-white mb-4"></h2>
        <FavoriteEvents />
      </div>
    </div>
  );
};
