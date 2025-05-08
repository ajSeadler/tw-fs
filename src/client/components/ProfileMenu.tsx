import type { FC } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Lock } from "lucide-react"; // Import Lock icon from Lucide
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { useUserProfile } from "../api/useUserProfile"; // Import the custom hook

interface ProfileMenuProps {
  profileOpen: boolean;
  setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ profileOpen, setProfileOpen }) => {
  const { user, loading, error, handleLogout } = useUserProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // If no user or no token (user not logged in)
  if (!user) {
    return (
      <div className="relative">
        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="flex items-center space-x-1 p-5 rounded-md hover:bg-neutral-800  transition"
          aria-label="User menu"
        >
          <Lock className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">
            <a href="/signup" className="hover:underline">
              Sign Up Today!
            </a>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setProfileOpen((prev) => !prev)}
        className="flex items-center space-x-1 p-1 rounded-md hover:bg-neutral-800 transition"
        aria-label="User menu"
      >
        <Avatar className="flex items-center justify-center bg-neutral-800 p-4 border border-gray-300 rounded-full">
          {user?.profile_picture ? (
            <AvatarImage
              src={user.profile_picture}
              alt="User Avatar"
              className="rounded-full"
            />
          ) : (
            <AvatarFallback className="text-gray-300 font-semibold">
              {user?.first_name?.charAt(0) ?? ""}
              {user?.last_name?.charAt(0) ?? ""}
            </AvatarFallback>
          )}
        </Avatar>
        <FiChevronDown className="h-4 w-4 text-gray-300" />
      </button>
      {profileOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-neutral-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-20 py-1 z-10">
          <a
            href="/me"
            className="block px-4 py-2 text-sm text-gray-200 hover:bg-neutral-700 transition"
          >
            My Profile
          </a>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-red-500 hover:bg-neutral-700 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
