"use client";

import { Card } from "@nextui-org/react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex justify-center items-start h-screen pt-10 shadow-1xl">
        <div className="max-w-lg min-h-[200px] p-5 bg-white shadow-lg rounded-lg mt-10">
          <h1 className="text-2xl font-bold text-center">Welcome!</h1>
          <p className="mt-4 text-center">
            {" "}
            {session.user.email} successfully authenticated using NextAuth with
            Prisma and SQLite. Tap on the above icon and enjoy our website.
          </p>{" "}
          <br />
          {/* <button className="text-black bg-sky-400 rounded px-3 py-1 hover:bg-sky-600  ">
            Sign out
          </button> */}
        </div>
      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button>Sign in</button>
    </>
  );
};

//   return (
//     <div className="flex justify-center items-start h-screen pt-10 shadow-1xl">
//       <div className="max-w-lg min-h-[200px] p-5 bg-white shadow-lg rounded-lg mt-10">
//         <h1 className="text-2xl font-bold text-center">Welcome!</h1>
//         <p className="mt-4 text-center">
//           You're successfully authenticated using NextAuth with Prisma and
//           SQLite. Tap on the above icon and enjoy our website.
//         </p>
//       </div>
//     </div>
//   );
// };

export default Dashboard;
