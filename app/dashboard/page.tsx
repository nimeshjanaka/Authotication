import { Card } from "@nextui-org/react";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-start h-screen pt-10 shadow-1xl">
      <div className="max-w-lg min-h-[200px] p-5 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-2xl font-bold text-center">Welcome!</h1>
        <p className="mt-4 text-center">
          You're successfully authenticated using NextAuth with Prisma and
          SQLite. Tap on the above icon and enjoy our website.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
