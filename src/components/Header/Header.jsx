"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import logo from "../../images/logo.png"
import ThemChanger from '@/Providers/Tehme/ThemChanger'
import User from '../User/User'

const Header = () => {
const router = useRouter();
 
  return <>
<div className='w-full'>
  <div className='flex items-center dark:bg-[#171717] pl-[58px]   justify-between bg-white px-5 py-3'>
    <div>
    <Image src={logo} className='md:w-[45px] mt-[10px] mx-auto w-[35px] h-[35px]  md:h-[45px] ' alt='img'/>

    </div>
    <ul className='flex items-center gap-2'>
      <li><ThemChanger/></li>
   
    
          <li>
            <User />
          </li>
    </ul>
  </div>
</div>

  </>
}

export default Header