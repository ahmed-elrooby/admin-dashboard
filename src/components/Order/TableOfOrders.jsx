"use client"
import React, { useContext } from 'react'
import { context } from '@/Providers/Context/ContextData'
import SkeletonOrders from '../Skeltons/SkeletonOrders/SkeletonOrders'

const TableOfOrders = () => {
    const {orders,userName} = useContext(context)
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
        className='hidden md:table-cell py-3.5 pl-6 pr-3 text-left text-sm font-semibold '>
            Date
        </th>
        <th
        scope='col'
        className=' py-3.5 pl-6 pr-3 text-left text-sm font-semibold ' 
        >
            status
        </th>
        <th
        scope='col'
        className=' py-3.5 pl-6 pr-3 text-left text-sm font-semibold ' 
        >
            total 
        </th>
        <th
        scope='col'
        className='hidden md:table-cell py-3.5 pl-6 pr-1 text-left text-sm font-semibold ' 
        >
            payment method
        </th>
        <th
        scope='col'
        className='py-3.5 pl-6 pr-1 text-left text-sm font-semibold ' 
        >
            Recipient
        </th>
    </tr>
</thead>
{
    orders?
    <tbody className='divide-y dark:divide-[#101010] divide-gray-200 text-gray-900 dark:text-white bg-white dark:bg-[#171717]'>

    {
        orders?.map((order)=>{
            return(
                <tr key={order.orderId}>
              
             
              <td className='hidden md:table-cell whitespace-nowrap   px-4 pl-4 pr-3 text-sm font-medium capitalize sm:pl-6'>
              {order.updatedAt}
            
                </td>
             
                <td className='  whitespace-normal px-4 pl-4 pr-3 text-sm font-medium sm:pl-6'>
             {order.status}
             
             </td>
             
             <td className='  whitespace-normal px-4 pl-4 pr-3 text-sm font-medium sm:pl-6'>
{order.total} EGP
                </td>
             
             <td className='hidden md:table-cell  whitespace-normal px-4 pl-4 pr-3 text-sm font-medium sm:pl-6'>
             {order.paymentMethod}
                </td>
                <td className='  whitespace-normal px-4 pl-4 pr-3 text-sm font-medium sm:pl-6'>
                    {userName.firstName} {userName.lastName}
                </td>
             </tr>
            )
        }
    
        
        )
    }
    
    </tbody>:<SkeletonOrders/>
}



        </table>

    </div>

</div>
    </div>
  </div>
  </>
}

export default TableOfOrders