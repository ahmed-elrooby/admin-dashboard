"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineMarkunreadMailbox } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";
import { FaBarsStaggered, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Cookies from "js-cookie";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";


const Aside = () => {
  const [isClosed, setIsClosed] = useState(false);

  const toggleSidebar = () => {
    setIsClosed((prev) => !prev);
  };

  const router = useRouter();
  const pathname = usePathname();

  const lists = [
    { id: 0, icon: <RxDashboard size={24} />, content: "dashboard", href: "/" },
    { id: 1, icon: <MdOutlineMarkunreadMailbox size={24} />, content: "products", href: "/Products" },
    { id: 2, icon: <FaBarsStaggered size={24} />, content: "categories", href: "/Categories" },
    { id: 3, icon: <AiOutlineUnorderedList size={24} />, content: "orders", href: "/Orders" },
    { id: 4, icon: <FaPeopleGroup size={24} />, content: "customers", href: "/Customer" },
  ];

  const activeClass = "bg-[--main-color] dark:bg-[#101010] dark:text-[--secondary-color] font-bold text-[--secondary-color]";
  const notActive = "";
  const hoverClass = "hover:bg-[--main-color] dark:hover:bg-[#101010] dark:hover:text-[--secondary-color]    hover:text-[--secondary-color]";



  const handleLogout = ()=>{
        Cookies.remove("tokenUser" ,{path:"/"})
        Cookies.remove("RefreshtokenUser",{path:"/"})
        router.push("/Login")
      
      }
  return (
    <div className=" relative ">
      <div
        onClick={toggleSidebar}
        className="bg-[--secondary-color] hover:bg-[#B8B5E8] pl-0 md:p-2 p-1 transition-all duration-300 rounded-r-lg cursor-pointer absolute -right-[27px] md:-right-[39px] top-3 text-white z-10"
      >
        {isClosed ? <FaAngleRight size={24} /> : <FaAngleLeft size={24} />}
      </div>

      <aside
        className={` pt-3 min-h-screen  transition-all duration-300 ${
          isClosed ? "w-0 p-0" : " w-fit md:w-[200px] "
        } `}
      >
        <ul className={`flex   flex-col gap-2 ${isClosed ? "hidden" : "flex"} items-start`}>
          {lists.map((item) => (
            <li key={item.id} className="w-full">
              <Link
                className={`flex items-center gap-2 w-full text-[18px] p-2 capitalize rounded-l-lg transition-all ${
                  pathname === item.href ? activeClass : notActive
                } ${hoverClass} font-bold`}
                href={item.href}
              >
                {item.icon}
                <p className="hidden md:block">{item.content}</p>
              </Link>
            </li>
          ))}
        

              { Cookies.get("tokenUser")?   <li
           onClick={handleLogout}
                className={`flex items-center cursor-pointer gap-2 w-full text-[18px] p-2 capitalize rounded-l-lg transition-all  ${hoverClass} font-bold`}
              >
               <AiOutlineLogout size={24} />
               <p className="hidden md:block">log out </p> 
              </li>: <li  className="w-full">
              <Link
                className={`flex items-center gap-2 w-full text-[18px] p-2 capitalize rounded-l-lg transition-all ${
                  pathname === "/Login" ? activeClass : notActive
                } ${hoverClass} font-bold`}
                href="/Login"
              >
                <FaRegUser size={24}/>
                <p className="hidden md:block">Login</p>
              </Link>
            </li>}
        </ul>
      </aside>
    </div>
  );
};

export default Aside;
