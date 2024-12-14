"use client"
import Link from 'next/link'
import React from 'react'
import { TbPasswordUser } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { usePathname } from 'next/navigation';

const AsideProfile = () => {
  const elements = [
    {id: 0, content: "general", href: "/Profile", icon: <IoSettings size={24}/>},
    {id: 1, content: "password", href: "/Profile/ChangePassword", icon: <TbPasswordUser size={24}/>},
  ];

  const pathname = usePathname();
  const active = "bg-[--main-color] dark:bg-[#4444445e]";
  const activeIcon = "text-[--secondary-color] bg-white dark:bg-[#3734346b] p-2 rounded-full";
  const notActive = "bg-transparent";
  const hoveractive = "transition-all hover:bg-[--main-color] hover:dark:bg-[#4444445e]";

  return (
    <div className='dark:bg-[#171717] shadow-lg bg-white rounded-lg w-full md:w-[370px] pb-[79px] pt-4 mt-[10px] p-2'>
      <aside className='p-2'>
        <div>
          <ul className='flex flex-col items-start gap-8'>
            <li>
            <h1 className='mb-3   md:text-[18px] text-[18px] capitalize text-[--secondary-color] font-bold relative after:absolute after:content-[""] before:content-[""] before:absolute before:bottom-[-4px] before:h-[4px] before:bg-white before:w-full before:left-0 after:bottom-[-4px] after:left-0 pb-1 after:rounded-md after:bg-[--secondary-color] before:rounded-md after:w-1/2 after:h-[4px] w-fit  '>Account settings  </h1>
            </li>
            {
              elements.map((ele) => (
                <li key={ele.id} 
                className='relative after:absolute w-full after:bottom-0 after:left-0 pt-1 pb-3 after:h-[1px] after:w-full after:content-[""] after:bg-gray-500'>
                  <Link className={`mb-3 group ${pathname === ele.href ? active : notActive} ${hoveractive} bg-[--main-color] flex items-center gap-2 capitalize py-1 rounded-lg`} href={ele.href}>
                    <div className='flex transition-all text-[--secondary-color] items-center justify-center p-3 rounded-full'>
                      <span className={` ${activeIcon} transition-all `}>{ele.icon}</span>
                    </div>
                    <h1 className='text-[19px]'>{ele.content}</h1>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default AsideProfile;
