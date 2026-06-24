import React from "react";
import Image from "next/image";
import Button from "../ui/button/Button";

interface MemberCardProps {
  name: string;
  memberId: string;
  membershipPlan: string;
  lastCheckIn: string;
  avatarUrl: string;
  coverImageUrl: string;
  status: "ACTIVE" | "EXPIRED" | "TRIAL";
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  memberId,
  membershipPlan,
  lastCheckIn,
  avatarUrl,
  coverImageUrl,
  status,
}) => {
  const statusColors = {
    ACTIVE: "bg-green-500",
    EXPIRED: "bg-red-500",
    TRIAL: "bg-blue-500",
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Cover */}
      <div className="relative h-32 w-full bg-gray-200">
        <Image
          src={coverImageUrl}
          alt="Cover"
          fill
          className="object-cover"
          unoptimized
        />

        <span
          className={`absolute right-3 top-3 rounded px-2 py-1 text-xs text-white ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Avatar */}
      <div className="relative -mt-10 px-4">
        <div className="h-20 w-20 overflow-hidden rounded-xl border-3 border-white">
          <Image
            src={avatarUrl}
            alt={name}
            width={80}
            height={80}
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {memberId}
        </p>

        <div className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Plan</span>
            <span className="font-semibold">{membershipPlan}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Check-In</span>
            <span className="font-semibold">{lastCheckIn}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="outline" size="sm">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
