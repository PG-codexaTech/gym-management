import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User Profile Page",
};

const Profile: React.FC = () => {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Profile Page</h1>
    </div>
  );
};

export default Profile;
