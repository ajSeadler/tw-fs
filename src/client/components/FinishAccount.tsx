import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../api/useUserProfile";

const FinishAccount: FC = () => {
  const { formData, handleInputChange, handleSubmit } = useUserProfile();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleSubmit(e); // Pass the event to handleSubmit
    navigate("/me"); // Navigate to /me after successful submit
  };

  return (
    <>
      <div className="bg-black min-h-screen min-w-screen flex flex-col">
        <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-2xl font-semibold mb-6">Complete Your Account</h1>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300">Username</label>
                <input
                  name="username"
                  value={formData?.username || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none"
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
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Last Name</label>
                <input
                  name="last_name"
                  value={formData?.last_name || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Email</label>
                <input
                  name="email"
                  value={formData?.email || ""}
                  disabled
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-gray-400 placeholder-zinc-500 focus:outline-noney"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Location</label>
                <input
                  name="location"
                  value={formData?.location || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Bio</label>
                <input
                  name="bio"
                  value={formData?.bio || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none"
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
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleCancelClick}
                className="px-6 py-2 text-sm rounded-md border border-gray-400 text-gray-300 hover:bg-neutral-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm rounded-md border-2 border-green-500 text-green-400 hover:bg-neutral-700 transition font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FinishAccount;
