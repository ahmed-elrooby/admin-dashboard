"use client"
import React, { useContext } from 'react'
import SkeltonCategories from '../Skeltons/SkeltonCategories/SkeltonCategories'
import Image from 'next/image'
import { BiSolidMessageAltEdit } from 'react-icons/bi'
import { MdAutoDelete } from 'react-icons/md'
import Link from 'next/link'
import { context } from '@/Providers/Context/ContextData'
import Cookies from 'js-cookie'

const TableOfCategories = ({handleDelete}) => {
   const {categories} = useContext(context)
   const token = Cookies.get("tokenUser")

  return <>
  <div className='mt-10  w-[90%] md:w-[95%] mx-auto flex flex-col'>
    <div className='-my-2 -mx-4 sm:-mx-6 lg:mx-8 overflow-x-auto'>
<div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
    <div className='overflow-x-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
        <table className=' min-w-full divide-y divide-gray-300'>
<thead className='bg-[--secondary-color]  text-white font-bold capitalize'>
    <tr>
        <th
        scope='col'
        className='py-3.5 pl-6 pr-3 text-left text-sm font-semibold '>
            name
        </th>
        <th
        scope='col'
        className='hidden md:table-cell py-3.5 pl-6 pr-3 text-left text-sm font-semibold ' 
        >
            description
        </th>
        <th
        scope='col'
        className='py-3.5 pl-6 pr-1 text-left text-sm font-semibold ' 
        >
            action
        </th>
    </tr>
</thead>
{
    categories?
<tbody className="divide-y dark:divide-[#101010] divide-gray-200 text-gray-900 dark:text-white bg-white dark:bg-[#171717]">
  {categories?.map((ele) => (
    <tr key={ele.categoryId}>
      <td className="whitespace-nowrap px-4 pl-4 pr-3 text-sm font-medium text-[--secondary-color] sm:pl-6">
        {ele.name}
        <Image
          src={ele.imageUrl || "/placeholder.png"}
          alt="img"
          width={80}
          height={80}
          className="object-cover mt-1 transition-all hover:scale-[1.3] mb-[2px] rounded-lg"
        />
      </td>

      <td className="hidden md:table-cell whitespace-normal px-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
        {ele.description}
      </td>

      <td className="whitespace-nowrap flex flex-col gap-2 justify-around items-center px-4 pl-4 pr-3 text-sm font-medium mt-1 sm:pl-6">
        <Link
          href={`/Categories/Update/${ele.categoryId}`}
          className="flex group p-[2px] mx-auto text-white border hover:border-[--secondary-color] transition-all rounded-sm hover:bg-white hover:text-[--secondary-color] gap-1 items-center bg-[--secondary-color]"
        >
          <span className="hidden md:block capitalize">update</span>
          <div className="mx-auto md:p-0 p-[2px]">
            <BiSolidMessageAltEdit className="block md:text-[20px] text-[24px] group-hover:scale-[1.2] transition-all" />
          </div>
        </Link>

        {token && (
          <div
            onClick={() => handleDelete(ele)}
            className="flex cursor-pointer group p-[2px] px-[2px] md:px-1 mx-auto text-white border hover:border-red-600 transition-all rounded-sm hover:bg-white hover:text-red-600 gap-1 items-center bg-red-400"
          >
            <span className="hidden md:block capitalize">delete</span>
            <div className="mx-auto md:p-0 p-[2px]">
              <MdAutoDelete className="block md:text-[20px] text-[24px] group-hover:scale-[1.2] transition-all" />
            </div>
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>:<SkeltonCategories/>
}




        </table>

    </div>

</div>
    </div>
  </div>
  </>
}

export default TableOfCategories