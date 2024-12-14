"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import { BiSolidMessageAltEdit } from 'react-icons/bi';
import { MdAutoDelete } from 'react-icons/md';
import { context } from '@/Providers/Context/ContextData';
import SkeletonCustomers from '../Skeltons/SkeletonCustomer/SkeletonCustomers';

const TableOfCustomers = () => {
    const { allCustomers } = useContext(context);

  return <>
  <div className='mt-10 w-[90%] md:w-[95%]   mx-auto   flex flex-col'>
    <div className='-my-2 -mx-4 sm:-mx-6 lg:mx-8 overflow-x-auto'>
<div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
    <div className='overflow-x-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
        <table className=' min-w-full divide-y  divide-gray-300'>
<thead className='bg-[--secondary-color]  text-white font-bold capitalize'>
    <tr >
   
        <th
        scope='col'
        className='py-3.5 pl-6 pr-3 text-left text-sm font-semibold ' 
        >
            name
        </th>
        <th
        scope='col'
        className='py-3.5 pl-6 pr-3  text-left text-sm font-semibold ' 
        >
            eamil
        </th>
        <th
        scope='col'
        className=' py-3.5 pl-6 pr-3 text-left text-sm font-semibold ' 
        >
            bio
        </th>

        <th
        scope='col'
        className='py-3.5 pl-6 pr-3 text-left text-sm font-semibold ' 
        >
            action
        </th>
    </tr>
</thead>
{
    allCustomers?
    <tbody className='divide-y dark:divide-[#101010] divide-gray-200 text-gray-900 dark:text-white bg-white dark:bg-[#171717]'>

    {
        allCustomers?.map((ele)=>{
            return(
                <tr key={ele.customerId}>
                 <td className='whitespace-nowrap   px-4 pl-4 pr-3 text-sm font-medium text-[--secondary-color] sm:pl-6'>
            {ele.firstName} {ele.lastName}
     <Image
                                src={ele.profilePictureUrl}
                                alt={ele.firstName}
                                width={80}
                                height={80}
                                className='object-cover transition-all hover:scale-[1.3] mt-1  mb-[2px] rounded-lg   '
                              />
                </td>
        
                <td className=' hidden md:table-cell px-4 pl-4 pr-3 text-sm font-medium  sm:pl-6'>
             {ele.email}
                </td>
                <td className=' hidden md:table-cell px-4 pl-4 pr-3 text-sm font-medium  sm:pl-6'>
             {ele.bio}
                </td>

             <td className='whitespace-nowrap flex flex-col md:flex-row gap-2 px-4 pl-4 pr-3 text-sm font-medium  mt-1 sm:pl-6'>
             <Link href="/" className='flex  group p-[2px] mx-auto text-white border hover:border-[--secondary-color]  transition-all rounded-sm hover:bg-white hover:text-[--secondary-color] gap-1 items-center bg-[--secondary-color]'>
            <span className='hidden md:block capitalize'>update</span>
            <div className='mx-auto md:p-0 p-[2px]'>
                <BiSolidMessageAltEdit className='block md:text-[20px] text-[24px] group-hover:scale-[1.2]   transition-all '/>
                </div>
             </Link>
     
    
             <div  className='flex  group p-[2px] px-[2px] md:px-1 mx-auto text-white border hover:border-red-600  transition-all rounded-sm hover:bg-white hover:text-red-600 gap-1 items-center bg-red-400'>
            <span className='hidden md:block capitalize'>delete</span>
            <div className='mx-auto md:p-0 p-[2px]'>
            <MdAutoDelete className='block md:text-[20px] text-[24px] group-hover:scale-[1.2]   transition-all '/>
                </div>
             </div>
             
                </td>
             </tr>
            )
        }
    
        
        )
    }
    
    </tbody>:<SkeletonCustomers/>
}





        </table>

    </div>

</div>
    </div>
  </div>
  </>
}

export default TableOfCustomers