"use client"
import { context } from '@/Providers/Context/ContextData';
import React, { useContext } from 'react'
import { FaEllipsisH } from 'react-icons/fa';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';



const CountChart = () => {
    const {products} = useContext(context)
   
    const activeProducts = products?.filter(product => product.status === 'Active');
    const notactiveactiveProducts = products?.filter(product => product.status === 'Notactive');

    const data = [
        {
          name: 'total',
          count: products?.length,
          fill: 'white',
        },
        {
          name: 'active',
          count: activeProducts?.length ,
          fill: '#83a6ed',
        },
        {
          name: 'not active',
          count: notactiveactiveProducts?.length,
          fill: '#8dd1e1',
        },
      ];
  return <>
     
      <div className='w-full h-full pb-10 p-4 '>
<div className='flex justify-between items-center'>
    <div className='flex flex-col gap-1 items-center'>
    <h3 className='capitalize font-bold'>products</h3>
    <span className='text-[#8884d8] font-bold'>{products?.length}</span>
    </div>
<FaEllipsisH className='text-gray-600'/>
</div>
  <div className='w-full h-[75%]'>
  <ResponsiveContainer  >
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="count"
          />
        </RadialBarChart>
      </ResponsiveContainer>
  </div>
  <div className='flex justify-center gap-11 items-center'>
  <div className='flex flex-col items-center gap-2'>
    <div className='rounded-full w-[20px] h-[20px] bg-[#83A6ED]'/>
    <span className='font-bold'>
        {activeProducts?.length}
    </span>
    
<h5 className='text-gray-400'>Published </h5>
 </div>


 <div className='flex flex-col items-center gap-2'>
    <div className='rounded-full w-[20px] h-[20px] bg-[#8DD1E1]'/>
    <span className='font-bold'>
        {notactiveactiveProducts?.length}
    </span>
    
<h5 className='text-gray-400'>Disabled 
</h5>
 </div>

  </div>

      </div>
  </>
}

export default CountChart