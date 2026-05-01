import MemberCard from "@/components/common/MemberCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";



const MemberManagement = () => {
  const MOCK_MEMBERS = [
    {
      id: 1,
      name: "Marcus Sterling",
      memberId: "#PPG-88291",
      membershipPlan: "Pro Elite Plan",
      lastCheckIn: "Today, 08:45 AM",
      status: "ACTIVE" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      coverImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    },
    {
      id: 2,
      name: "John Rodriguez",
      memberId: "#PPG-99023",
      membershipPlan: "Standard Plus",
      lastCheckIn: "14 Days Ago",
      status: "EXPIRED" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      coverImageUrl: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      memberId: "#PPG-99023",
      membershipPlan: "Standard Plus",
      lastCheckIn: "14 Days Ago",
      status: "TRIAL" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      coverImageUrl: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      memberId: "#PPG-99023",
      membershipPlan: "Standard Plus",
      lastCheckIn: "14 Days Ago",
      status: "ACTIVE" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=9",
      coverImageUrl: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
    },
  ];
  
  return (
    <>
    <PageBreadcrumb items={[{ label: "Member Management" }]} />
    <div className="flex items-center justify-between mb-5 rounded-md p-4 border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Total Member <span className="text-brand-500 font-bold text-2xl ml-2 border border-brand-500 rounded-md px-2 py-1">{MOCK_MEMBERS.length}</span>
      </h3>        
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MOCK_MEMBERS.length > 0 && (MOCK_MEMBERS.map((member) => (
          <MemberCard key={member.id} {...member} />
        )))}
      </div>
    </>
  )
}

export default MemberManagement