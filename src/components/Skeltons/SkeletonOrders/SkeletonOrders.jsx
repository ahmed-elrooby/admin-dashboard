import React from 'react'

const SkeletonOrders = () => {
  return <>
  
  <tbody className='bg-white dark:bg-[#171717]'>
            {Array.from({ length: 15 }).map((_, index) => (
              <tr key={index} className="animate-pulse  ">
                <td className=" py-2  bg-white dark:bg-[#171717] ">
                  <span className='w-[80%] h-[15px] block mx-auto rounded-sm dark:bg-gray-600 bg-slate-200'></span>
                </td>
              
                <td className="  bg-white dark:bg-[#171717] ">
                  <span className='w-[80%] h-[15px] block mx-auto rounded-sm dark:bg-gray-600 bg-slate-200'></span>
                </td>
                <td className="  bg-white dark:bg-[#171717] ">
                  <span className='w-[80%] h-[15px] block mx-auto rounded-sm dark:bg-gray-600 bg-slate-200'></span>
                </td>
                <td className="  bg-white dark:bg-[#171717] ">
                  <span className='w-[80%] h-[15px] block mx-auto rounded-sm dark:bg-gray-600 bg-slate-200'></span>
                </td>
                <td className="  bg-white dark:bg-[#171717] ">
                  <span className='w-[80%] h-[15px] block mx-auto rounded-sm dark:bg-gray-600 bg-slate-200'></span>
                </td>
                
              </tr>
            ))}
          </tbody>
  </>
}

export default SkeletonOrders