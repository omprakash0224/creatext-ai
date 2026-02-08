"use client";
import React from "react";
import Image from "next/image";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import UsageTrack from "./UsageTrack";

function SideNav() {
  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/setting",
    },
  ];

  const path = usePathname();
  const router = useRouter();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform md:relative md:w-64`}
    >
      <div className="h-screen relative p-5 shadow-sm">
        <div className="flex justify-center">
          <Image src={"/logo2.png"} alt="logo" width={200} height={200} />
        </div>
        <br className="my-5" />
        <div className="mt-10">
          {MenuList.map((menu, index) => (
            <div
              key={index}
              className={`flex gap-2 mb-2 p-3 hover:bg-violet-700 hover:text-white rounded-lg cursor-pointer items-center ${
                path === menu.path && "bg-violet-700 text-white"
              }`}
              onClick={() => {
                router.push(menu.path);
              }}
            >
              <menu.icon className="h-7 w-7" />
              <h2 className="text-lg">{menu.name}</h2>
            </div>
          ))}
        </div>
        <div className="absolute bottom-10 left-0 w-full">
          <UsageTrack />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
