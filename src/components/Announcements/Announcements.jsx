import React from 'react'

const Announcements = () => {
    const announcements = [
        {
          id: 1,
          title: "End of Season Sale!",
          time: "10:00 AM ",
          description: "Get up to 70% off on all summer items. Limited time offer!",
        },
        {
          id: 2,
          title: "New Payment Options",
          time: "05:30 PM",
          description: "We now accept PayPal and Apple Pay for faster checkout.",
        },
        {
          id: 3,
          title: "Storewide Holiday Sale",
          time: "12:00 PM ",
          description: "Celebrate the holidays with our biggest sale of the year. Discounts up to 50%.",
        },
      ];
      
  return <>
    <div className='  w-full mx-auto bg-white p-5 shadow rounded-lg dark:bg-[#171717]'>
    <div>
    <div className='flex justify-between items-center '>
        <h1>Announcements</h1>
        <span>view all</span>
    </div>
    <div className='flex flex-col gap-2 mt-2'>
{
    announcements.map((ann)=><div key={ann.id} className='odd:bg-[#83A6ED] p-3 rounded-md even:bg-[#8DD1E1]'>
<div className='flex justify-between items-center my-2'>
<h1 className='text-gray-200 font-semibold'>{ann.title}</h1>
<span className='text-[#ddd] dark:text-gray-400 bg-white w-fit dark:bg-[#282828] p-1 rounded-lg text-xs'>{ann.time}</span>
</div>
<p className='text-gray-200 text-xs'>{ann.description}</p>

</div>
)
}
    </div>
    </div>
</div>
  </>
}

export default Announcements