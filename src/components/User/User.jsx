"use client"
import { context } from '@/Providers/Context/ContextData';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { FaRegUser } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6'
import { GoSignOut } from "react-icons/go";

const User = () => {
  const {setIsLoggedIn} = useContext(context)
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropDown =()=>{
        setIsDropdownOpen((prev)=> !prev)
    }

    const handleLogout =()=>{
        Cookies.remove("tokenUser" ,{path:"/"})
        Cookies.remove("RefreshtokenUser",{path:"/"})
        setIsLoggedIn(false)

        setIsDropdownOpen(false)
         router.push("/Login")
    }
  return <>
<ul className='flex items-center gap-2 '>
          <li className="relative w-full  ">
            <span
              className="relative cursor-pointer  flex gap-2 group transition-all items-center text-[20px] font-bold w-full py-2 capitalize "
              onClick={handleDropDown }
            >
              <FaCircleUser 
              className='text-[--secondary-color] transition-all border border-[--secondary-color] group-hover:scale-[1.3] p-1  rounded-full'
               size={32}/>
            </span>
            {isDropdownOpen && (
              <ul className="absolute bg-[--main-color] dark:bg-[#171717]  border border-[--semi-color] shadow-lg mt-0 rounded-md  right-[20px] w-[150px] z-20">
                {
                  Cookies.get("tokenUser") ? (
                    <>
                      <li className="px-4 py-2 font-bold group transition-all dark:text-white text-gray-700 cursor-pointer hover:bg-[--secondary-color] hover:rounded-t-md hover:text-white">
                        <Link
                          onClick={() => setIsDropdownOpen(false)}
                          href="/Profile"
                          className="flex items-center select-none  w-full text-[22px] gap-2"
                        >
                          <FaRegUser className='text-[--secondary-color] group-hover:text-white'  /> Profile
                        </Link>
                      </li>
                      <li  onClick={handleLogout}
                        className="px-4 flex items-center text-gray-700 dark:text-[#ddd] select-none group transition-all text-[22px] gap-2 py-2 w-full font-bold cursor-pointer hover:bg-[--secondary-color] hover:rounded-b-md hover:text-white"
                      >
                        <GoSignOut className='text-[--secondary-color] group-hover:text-white' /> Log out
                      </li>
                    </>
                  ) : (
                    <li className="px-4 py-2 group select-none transition-all  font-bold cursor-pointer text-gray-700 dark:text-[#ddd] hover:bg-[--secondary-color] hover:rounded-t-md hover:text-white">
                      <Link
                      onClick={()=>{setIsDropdownOpen(false)}}
                        href="/Login"
                        className="flex items-center w-full text-[22px] gap-2"
                      >
                        <FaRegUser className='text-[--secondary-color] group-hover:text-white' /> login
                      </Link>
                    </li>
                  )
                }
              </ul>
            )}
          </li>
        </ul>
  </>
}

export default User