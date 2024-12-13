import React from 'react'

const SkeletonProductHome = () => {
 
  return <>
          

          <tbody className='bg-white dark:bg-[#171717]'>
            {Array.from({ length: 12 }).map((_, index) => (
              <tr key={index} className="animate-pulse  ">
                <td className="my-1  bg-white dark:bg-[#171717] ">
                  <span className='w-[80%] h-[15px] block mx-auto rounded-sm dark:bg-gray-600 bg-slate-200'></span>
                </td>
                <td className="  bg-white dark:bg-[#171717] ">
                  <span className='w-[80%] h-[15px] block mx-auto rounded-sm dark:bg-gray-600 bg-slate-200'></span>
                </td>
                <td className=" my-1  bg-white dark:bg-[#171717] ">
                  <span className='w-[80%] h-[15px] block mx-auto rounded-sm bg-slate-200 dark:bg-gray-700'></span>
                </td>
                               
              </tr>
            ))}
          </tbody>

  </>
}

export default SkeletonProductHome