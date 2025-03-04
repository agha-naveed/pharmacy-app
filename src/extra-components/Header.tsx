import { FaRegBell } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Header({value}:any) {

    const navigate = useNavigate()

    const months = ['Jan', 'Feb', "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let date = new Date()

    async function logOut() {
        const res = await fetch("http://localhost:8000/account/api", {
            credentials: "include",
            method: "PATCH"
        })

        const data = await res.json()

        if(data.message == "ok") {
            alert("You've been Logged Out!")
            navigate("/account")
        }
        else {
            alert("Some error occurred!")
        }
    }

  return (
    <div className='w-full h-20 text-white !px-5 justify-between bg-slate-800 flex items-center'>
        <span className='font-semibold text-2xl'>{value}</span>
        <div className='flex items-center gap-4'>
            <button className='relative cursor-pointer' title='Notifications'>
                <span className='absolute -top-4  bg-red-600 font-semibold text-[15px] !px-[7px] rounded-full'>2</span>
                <FaRegBell className='text-3xl' />
            </button>
            <button className='justify-items-center hover:bg-slate-900 cursor-pointer transition-all rounded-full !p-3' onClick={() => logOut()}>
                <BiLogOut className='text-2xl' />
                <span>Logout</span>
            </button>
            <div className='h-14 w-[1px] bg-white'></div>
            <h4 className='flex flex-col text-center'>
                <span className='text-3xl font-semibold'>
                    {date.getDate()}
                </span>
                {months[date.getMonth()]} {date.getFullYear()}
            </h4>
        </div>
    </div>
  )
}