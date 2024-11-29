"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import React from 'react';
import {  MdOutlineMarkunreadMailbox } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import Image from 'next/image';
import regImg from "../../images/register.svg"

const Aside = () => {
    const lists = [
        { id: 0, icon: <RxDashboard size={24} />, content: "dashboard", href: "/" },
        { id: 1, icon: <MdOutlineMarkunreadMailbox  size={24} />, content: "products", href: "/Products" },
        { id: 2, icon: <AiOutlineUnorderedList size={24}/>, content: "orders", href: "/Orders" },
        { id: 3, icon: <IoSettingsOutline size={24} />, content: "settings", href: "/Settings" },
    ];
    
    const activeClass = "bg-[--main-color] font-bold text-[--secondary-color]";
    const inactiveClass = "bg-white";
    const hoverActive="hover:bg-[--main-color] hover:font-bold hover:text-[--secondary-color]"
    const pathname = usePathname(); 
    
    return (
        <div>
            <aside className=' w-fit md:w-[210px] min-h-screen    p-3 pr-0 '>
        <Image
        loading='lazy'
         src={regImg} className='w-[50px] mt-[10px] mx-auto  h-[50px] rounded-full' alt='img'/>
                <ul className='flex flex-col gap-2  pt-[25px]  items-start'>
 
                    {lists.map((item) => (
                        <li key={item.id} className='w-full'>
                            <Link
                                className={`flex font-bold rounded-l-lg ${hoverActive} transition-all  items-center gap-2 w-full text-[18px] p-2 capitalize ${pathname === item.href ?activeClass :inactiveClass }`}
                                href={item.href}
                            >
                                {item.icon}
                              <p className='hidden md:block'>  {item.content}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default Aside;
