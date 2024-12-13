import AsideProfile from '@/components/AsideProfile/AsideProfile'
import React from 'react'

const layout = ({children}) => {
  return <>
  <div className='flex pl-11 pt-3 gap-5 md:flex-row flex-col items-start'>
    <AsideProfile />
<section className='w-full  p-2'>
    {children}
</section>
  </div>
  </>
}

export default layout