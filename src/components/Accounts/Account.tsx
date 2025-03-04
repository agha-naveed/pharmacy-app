import logo from '../../assets/img/logo.png'
import { Outlet } from 'react-router-dom'

export default function Account() {
  return (
    <div className='flex md:flex-row flex-col md:gap-0 gap-20 w-full min-h-screen h-full'>
      <div className='md:w-1/2 w-full md:min-h-screen h-32 justify-items-center bg-slate-800 grid justify-center gap-4 content-center'>
        <img src={logo} className='w-44' alt="Lenmi Store Logo" />
        <span className="text-center text-white text-3xl font-semibold">Ali Medical Store</span>
        <span className="text-[22px] text-white relative -top-3">Admin Panel</span>
      </div>
      <div className="md:w-full p-4">
        <Outlet />
      </div>
    </div>
  )
}