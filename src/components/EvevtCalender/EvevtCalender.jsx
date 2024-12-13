"use client";

import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaEllipsisH } from 'react-icons/fa';

const EvevtCalender = () => {
  const events = [
    {
      id: 1,
      title: "Flash Sale",
      time: "10:00 AM - 12:00 PM",
      description: "Get up to 50% off on selected items. Hurry, only a few items left!",
    },
    {
      id: 2,
      title: "New Product Launch",
      time: "1:00 PM - 3:00 PM",
      description: "Join us for the exclusive launch of our newest product. Be the first to experience it!",
    },
    {
      id: 3,
      title: "Customer Appreciation Event",
      time: "4:00 PM - 6:00 PM",
      description: "A special event to thank our loyal customers with discounts and giveaways.",
    },
    {
      id: 4,
      title: "Holiday Sale",
      time: "12:00 PM - 6:00 PM",
      description: "Celebrate the holidays with amazing discounts on a wide range of products!",
    },
  ];

  // استخدام onChange بدلاً من setValue
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      onChange(new Date()); // تعيين التاريخ إلى اليوم عند التحميل
    }
  }, []);

  return (
    <div className='w-full bg-white shadow p-5 rounded-lg dark:bg-[#171717]'>
      <Calendar onChange={onChange} value={value} />
      <div className="flex my-2 justify-between items-center">
        <h1 className="text-lg font-semibold">Events</h1>
        <FaEllipsisH className="text-gray-500" />
      </div>
      <div className='flex flex-col gap-4'>
        {events.map((event) => (
          <div
            className='p-5 border-gray-100 rounded-md odd:border-t-[#8DD1E1] even:border-t-[#83A6ED] border-2 border-t-4'
            key={event.id}
          >
            <div className='flex items-center mb-1 justify-between'>
              <h1 className='text-gray-600 font-semibold'>{event.title}</h1>
              <span className='text-[#ddd] dark:text-gray-300 text-xs'>{event.time}</span>
            </div>
            <p className='text-gray-400 text-sm'>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvevtCalender;
