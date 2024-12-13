"use client"
import Link from 'next/link'
import React  from 'react'

import TableOfProducts from './TableOfProducts'

const Product = () => {




  return (
    <>
      <div className='p-2 w-[95%] mx-auto'>
      <div className='flex gap-1 md:flex-row flex-col justify-between items-start md:items-center'>
<div className='flex flex-col gap-2 items-start'>
<h1 className='btn'>products </h1>
<span className='text-gray-400'>Let’s check your update today</span>
</div>
<Link href="AddProduct" className='btn-primary w-full text-center md:w-fit'>add new products</Link>

       </div>

       <TableOfProducts />
       
      </div>
    </>
  );
}

export default Product;
