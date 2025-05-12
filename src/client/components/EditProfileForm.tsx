import { useUserProfile } from "../api/useUserProfile";

const EditProfileForm = () => {
  const { formData, handleInputChange, handleSubmit, handleCancelClick } =
    useUserProfile();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="block text-sm text-gray-300">First Name</label>
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
            className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-gray-400 placeholder-zinc-500 focus:outline-none"
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
  );
};

export default EditProfileForm;
