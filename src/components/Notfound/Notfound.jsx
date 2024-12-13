import Link from 'next/link'
import notFoundImage from '../../images/notfound.png';import Image from 'next/image'
const Notfound = () => {



  return <>
  <div className='flex w-[95%] bg-white p-3 rounded-lg dark:bg-[#171717]  mx-auto  sm:flex-col md:flex-row gap-3 items-center'>
   <div className='flex flex-col items-center gap-3'>
   <p className="text-xl  capitalize font-bold text-[#93E3AB]">Page Not Found</p>
      <p className="text-md text-gray-500 mt-4">
        The page you're looking for does not exist.
      </p>
      
   <Link className='border-2 border-[#93E3AB] hover:bg-[#93E3AB] hover:text-white text-[#93E3AB]  font-semibold capitalize transition-all rounded-md p-2' href={"/"}>
    home page
    </Link>
   </div>
<Image src={notFoundImage} alt='notfound' width={400} height={300}/>
  </div>
  </>
}

export default Notfound