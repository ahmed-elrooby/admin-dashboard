"use client"

import { context } from '@/Providers/Context/ContextData'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { AiFillProduct } from "react-icons/ai";
import { FaBasketShopping } from "react-icons/fa6";
import { TiGroup } from "react-icons/ti";
import { IoListCircle } from "react-icons/io5";
import React, { useContext, useEffect, useState } from 'react'
import CountChart from '../CountChart/CountChart';
import SalesChart from '../SalesCharts/SalesChart';
import PerformanceEcommerce from '../PerformanceEcommerce/PerformanceEcommerce';
import EvevtCalender from '../EvevtCalender/EvevtCalender';
import Announcements from '../Announcements/Announcements';
import ProductHome from '../ProductHome/ProductHome';

const Home = () => {
  const [adminId, setAdminId] = useState(null);

const currentDate = new Date()
  useEffect(() => {
    const id = Cookies.get("adminId");
    setAdminId(id);
  }, []);
  const {dataOfAdmin,categories,products,allCustomers,orders} = useContext(context)
  return <>




  <div className='mx-auto w-full bg-transparent  p-1.5 rounded-lg'>
  {
      adminId?<>
      <h1 className='capitalize '>hello, <span className='font-bold text-[--secondary-color]'>{dataOfAdmin?.firstName} {dataOfAdmin?.lastName}</span></h1>

      </>:<div>
      <p>Welcome to our <span className='text-[--secondary-color]  text-[20px] font-bold'>Website</span> 😊</p>
      <p className='text-gray-700 dark:text-[#F5F5F5] capitalize'>Join us now and <Link className='text-[--secondary-color] font-bold transition-all hover:text-[#453de1ab]' href="/Login">log in</Link> to enjoy our amazing services.</p>
      </div>
    }
    <div className='flex gap-4 md:flex-row flex-col items-start'>
  
<div className='md:w-2/3 w-full '>

    <div className=' mt-4 bg-white p-3 rounded-lg dark:bg-[#171717] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2   items-center'>
      <div className='p-3  capitalize flex flex-col group text-[--secondary-color] font-bold transition-all hover:bg-[--secondary-color] hover:text-white  gap-2 items-start rounded-md border-2 border-[--secondary-color]'>
       <p className='dark:bg-[#282828] group-hover:bg-[#5f59c8] bg-[--main-color] text-gray-600 py-1 px-2  rounded-full dark:text-[#ddd]'>{currentDate.toLocaleDateString()}</p>
        <div className='flex items-center justify-around w-full'>
          products
          <AiFillProduct size={28} />
        </div>

{products?.length || 0}

      </div>

      <div className='p-3 group capitalize flex flex-col text-[--secondary-color] font-bold transition-all hover:bg-[--secondary-color] hover:text-white  gap-2 items-start rounded-md border-2 border-[--secondary-color]'>
      <p className='dark:bg-[#282828] group-hover:bg-[#5f59c8] bg-[--main-color] text-gray-600 py-1 px-2  rounded-full dark:text-[#ddd]'>{currentDate.toLocaleDateString()}</p>

        <div className='flex items-center justify-around w-full'>
          orders
          <FaBasketShopping size={28} />
        </div>

{orders?.length || 0}

      </div> 
      <div className='p-3 group capitalize flex flex-col text-[--secondary-color] font-bold transition-all hover:bg-[--secondary-color] hover:text-white  gap-2 items-start rounded-md border-2 border-[--secondary-color]'>
      <p className='dark:bg-[#282828] group-hover:bg-[#5f59c8] bg-[--main-color] text-gray-600 py-1 px-2  rounded-full dark:text-[#ddd]'>{currentDate.toLocaleDateString()}</p>

        <div className='flex items-center justify-around w-full'>
        categories
          <IoListCircle size={28} />
        </div>

{categories?.length || 0}

      </div>
       <div className='p-3 capitalize group flex flex-col text-[--secondary-color] font-bold transition-all hover:bg-[--secondary-color] hover:text-white  gap-2 items-start rounded-md border-2 border-[--secondary-color]'>
       <p className='dark:bg-[#282828] group-hover:bg-[#5f59c8] bg-[--main-color] text-gray-600 py-1 px-2  rounded-full dark:text-[#ddd]'>{currentDate.toLocaleDateString()}</p>

        <div className='flex items-center justify-around w-full'>
          customers
          <TiGroup size={28} />
        </div>

{allCustomers?.length || 0}

      </div>  

    </div>

<div className='flex flex-col gap-4 items-center mt-4'>
  <div className='flex w-full items-center flex-col md:flex-row gap-2'>
    {/* count chart  */}
    <div className='bg-white p-3 shadow rounded-lg h-[450px] dark:bg-[#171717] w-full md:w-1/3'>
<CountChart /> 
   </div>
    {/* Attendeance chart */}
    <div className='bg-white p-3 shadow rounded-lg dark:bg-[#171717] h-[450px] w-full md:w-2/3'>
<SalesChart />
    </div>
   
  </div>
  {/* bottom chart */}
  <div className='w-full h-[500px] bg-white p-3 shadow rounded-lg dark:bg-[#171717]'>
  <PerformanceEcommerce />
  </div>
  <div className='w-full bg-white p-3 shadow rounded-lg dark:bg-[#171717] '>
      <ProductHome/>
    </div>
</div>
</div>
{/* calender */}
<div className='md:w-1/3 w-full p-3 rounded-lg bg-[--main-color] dark:bg-[#101010]   flex flex-col gap-6'>
<EvevtCalender />
{/* Announcements */}
<Announcements />
</div>

    </div>
   
  </div>
  </>
}

export default Home