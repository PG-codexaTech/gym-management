"use client";

import Tile from "@/app/components/common/Tile";
import Label from "@/app/components/form/Label";
import Select from "@/app/components/form/Select";
import Input from "@/app/components/ui/input/InputField";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  FaChartBar,
  FaExclamationCircle,
  FaRegClock,
  FaUsers,
  FaUserSlash,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

const generatePlanId = () => {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `plan-${Math.floor(Math.random() * 10000)}`;
};

// 2. TYPES
interface IMembershipPlan {
  id: string;
  months: string;
  price: string;
}

interface IMemberInput {
  name: string;
  mobile: string;
  address: string;
  date: string;
  membershipId: string;
  profileImage?: FileList;
}

interface IMembershipTypeInput {
  months: string;
  price: string;
}

export const DashboardClient = () => {
  // --- STATE ---
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"member" | "type">("member");
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  // Shared state for membership plans
  const [plans, setPlans] = useState<IMembershipPlan[]>([
    { id: "1", months: "1", price: "1000" },
    { id: "2", months: "3", price: "2500" },
  ]);

  const stats = {
    joined_members: { count: 1248 },
    monthly_joined: { count: 85 },
    expiring_within_3_days: { count: 14 },
    expiring_within_4_7_days: { count: 22 },
    expired: { count: 31 },
    inactive_members: { count: 156 },
  };

  // --- FORMS (Renamed to avoid conflicts) ---
  const {
    register: regMember,
    handleSubmit: handleMemberSubmit,
    reset: resetMember,
    formState: { errors: memberErr },
  } = useForm<IMemberInput>();

  const {
    register: regType,
    handleSubmit: handleTypeSubmit,
    reset: resetType,
    setValue: setValueType,
    formState: { errors: typeErr },
  } = useForm<IMembershipTypeInput>();

  // --- HANDLERS ---
  const onMemberSubmit: SubmitHandler<IMemberInput> = (data) => {
    console.log("Registering member with plan:", data.membershipId);
    resetMember();
    setIsOpen(false);
  };

  const onTypeSubmit: SubmitHandler<IMembershipTypeInput> = (data) => {
    if (editingPlanId) {
      setPlans((prev) => {
        return prev.map((plan) =>
          plan.id === editingPlanId ? { ...plan, ...data } : plan,
        );
      });
      setEditingPlanId(null);
    } else {
      const newPlan: IMembershipPlan = {
        id: generatePlanId(),
        months: data.months,
        price: data.price,
      };
      setPlans((prev) => [...prev, newPlan]);
    }

    resetType();
  };

  const deletePlan = (id: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEditPlan = (plan: IMembershipPlan) => {
    setEditingPlanId(plan.id);
    setValueType("months", plan.months);
    setValueType("price", plan.price);
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <div className="flex space-x-3">
          <Button
            size="sm"
            startIcon={<FaPlus />}
            onClick={() => {
              setModalMode("member");
              setIsOpen(true);
            }}
          >
            Add Member
          </Button>
          <Button
            size="sm"
            startIcon={<FaPlus />}
            onClick={() => {
              setModalMode("type");
              setIsOpen(true);
            }}
          >
            Membership
          </Button>
        </div>
      </div>

      {/* DASHBOARD TILES */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:gap-6 mb-8">
        <Tile
          title="Joined Members"
          value={stats.joined_members.count.toString()}
          icon={<FaUsers className="text-gray-800 size-6 dark:text-white/90" />}
        />

        <Tile
          title="Monthly Joined"
          value={stats.monthly_joined.count.toString()}
          icon={
            <FaChartBar className="text-gray-800 size-6 dark:text-white/90" />
          }
        />

        <Tile
          title="Expiring within 3 days"
          value={stats.expiring_within_3_days.count.toString()}
          icon={<FaRegClock className="text-red-600 size-6" />}
        />

        <Tile
          title="Expiring within 4-7 days"
          value={stats.expiring_within_4_7_days.count.toString()}
          icon={<FaRegClock className="text-orange-500 size-6" />}
        />

        <Tile
          title="Expired"
          value={stats.expired.count.toString()}
          icon={<FaExclamationCircle className="text-red-600 size-6" />}
        />

        <Tile
          title="InActive members"
          value={stats.inactive_members.count.toString()}
          icon={
            <FaUserSlash className="text-gray-800 size-6 dark:text-white/90" />
          }
        />
      </div>

      {/* DYNAMIC MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-4xl p-6"
      >
        <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">
          {modalMode === "member"
            ? "Add New Member"
            : "Manage Membership Plans"}
        </h2>

        {modalMode === "member" ? (
          /* FORM: ADD MEMBER */
          <form
            onSubmit={handleMemberSubmit(onMemberSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  register={regMember("name", { required: "Name is required" })}
                  errorMessage={memberErr.name?.message as string}
                  placeholder="Full Name"
                />
              </div>
              <div>
                <Label>
                  Select Membership Plan <span className="text-red-500">*</span>
                </Label>
                <Select
                  id="membershipId"
                  options={plans.map((plan) => ({
                    label: `${plan.months} Month(s) - ₹${plan.price}`,
                    value: plan.id,
                  }))}
                  register={regMember("membershipId", {
                    required: "Please select a plan",
                  })}
                />
                {memberErr.membershipId && (
                  <p className="text-red-500 text-xs mt-1">
                    {memberErr.membershipId.message}
                  </p>
                )}
              </div>
              <div>
                <Label>
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  register={regMember("mobile", {
                    required: "Mobile required",
                  })}
                  errorMessage={memberErr.mobile?.message as string}
                  placeholder="Mobile Number"
                />
              </div>
              <div>
                <Label>Join Date</Label>
                <Input type="date" register={regMember("date")} />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button>Enroll Member</Button>
            </div>
          </form>
        ) : (
          /* SECTION: ADD & VIEW PLANS */
          <div className="space-y-6">
            <form
              onSubmit={handleTypeSubmit(onTypeSubmit)}
              className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-900/50"
            >
              <h3 className="text-sm text-gray-800 dark:text-white font-bold mb-4">
                CREATE NEW PLAN
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Months (e.g. 12)"
                  register={regType("months", { required: "Required" })}
                  errorMessage={typeErr.months?.message as string}
                />
                <Input
                  placeholder="Price (e.g. 5000)"
                  register={regType("price", { required: "Required" })}
                  errorMessage={typeErr.price?.message as string}
                />
              </div>
              <div className="space-x-4">
                <Button className="mt-4">
                  {editingPlanId ? "Update Plan" : "Add Plan"}
                </Button>
                {editingPlanId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingPlanId(null);
                      resetType();
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>

            {plans.length > 0 && (
              <div className="overflow-hidden border rounded-xl">
                <table className="w-full text-sm text-center">
                  <thead className="bg-gray-100 text-gray-800 dark:text-white dark:bg-gray-800">
                    <tr>
                      <th className="p-4 w-30">Duration</th>
                      <th className="p-4 w-40">Price</th>
                      <th className="p-4 w-30">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan) => (
                      <tr
                        key={plan.id}
                        className={`border-t text-gray-800 dark:text-white dark:border-gray-700 ${editingPlanId === plan.id ? "bg-yellow-100 dark:bg-yellow-900/30" : ""}`}
                      >
                        <td className="p-4 capitalize">{plan.months} Months</td>
                        <td className="p-4">₹{plan.price}</td>
                        <td className="p-4 text-center space-x-10">
                          <button
                            onClick={() => deletePlan(plan.id)}
                            className="text-red-500 hover:scale-110 transition-transform"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() => handleEditPlan(plan)}
                            className="text-green-500 hover:scale-110 transition-transform"
                          >
                            <FaEdit />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
