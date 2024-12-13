import React from 'react'
import TableOfOrders from './TableOfOrders'

const Order = () => {
  return <>
    <div className='p-2 w-[95%] mx-auto'>
      <div className='flex gap-1 md:flex-row flex-col justify-between items-start md:items-center'>
<div className='flex flex-col gap-2 items-start'>
<h1 className='btn'>orders </h1>
<span className='text-gray-400'>Let’s check your update today</span>
</div>

       </div>

       <TableOfOrders />
       
      </div>

       
  
  </>
}

export default Order