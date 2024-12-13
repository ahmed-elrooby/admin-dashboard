"use client"
import { context } from '@/Providers/Context/ContextData'
import React, { useContext } from 'react'
import SkeletonProductHome from '../Skeltons/SkeletonProductHome/SkeletonProductHome'

const ProductHome = () => {
    const {products} = useContext(context)

  return <>
   <div className='mt-2  w-full '>
  <table className=' w-full divide-y   divide-gray-300'>
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
            price
        </th>
        <th
        scope='col'
        className='hidden md:table-cell py-3.5 pl-6 pr-3 text-left text-sm font-semibold ' 
        >
            description
        </th>
        
    </tr>
</thead>
{
    products?
    <tbody className='divide-y dark:divide-[#101010] divide-gray-200 text-gray-900 dark:text-white bg-white dark:bg-[#171717]'>

    {
        products?.slice(0,8).map((ele)=>{
            return(
                <tr key={ele.productId}>
                 <td className='whitespace-nowrap   px-4 pl-4 pr-3 text-sm font-medium text-[--secondary-color] sm:pl-6'>
            {ele.name}
    
                </td>
             <td className='whitespace-nowrap uppercase px-4 pl-4 pr-3 text-sm font-medium  sm:pl-6'>
             {ele.price} egp 
                </td>
             <td className=' hidden md:table-cell px-4 pl-4 pr-3 text-sm font-medium  sm:pl-6'>
             {ele.description}
                </td>
            
             </tr>
            )
        }
    
        
        )
    }
    
    </tbody>:<SkeletonProductHome/>
}




        </table>
  </div>
  </>
}

export default ProductHome