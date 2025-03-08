import { FaRegBell } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header({value}:any) {

    const navigate = useNavigate()

    const months = ['Jan', 'Feb', "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let date = new Date()

    const [expired, setExpired] = useState([])

    useEffect(() => {
        async function checkExpiry() {
            const res = await fetch("http://localhost:8000/check-expiry/api", {
                method: "GET"
            })
            const response = await res.json()

            if(response.message == 'ok') {
                setExpired(response.data)
            }
        }
        checkExpiry()
    }, [])

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
        <div className='flex items-center gap-4 relative'>
            <div className="group">
                <button className='relative !p-[10px] cursor-pointer left-3 rounded-full' title='Notifications'>
                    <span
                    className={`
                    absolute
                    top-0
                    bg-red-600
                    font-semibold
                    text-[15px]
                    !px-[7px]
                    rounded-full
                    ${expired.length > 0 ? "inline" : "hidden"}
                    `}>
                        {expired.length}
                    </span>
                    <FaRegBell className='text-3xl' />
                </button>
                
                <div className={`
                    group-hover:grid
                    hidden
                    absolute
                    top-[60px]
                    -left-1/4
                    rounded-md
                    w-auto
                    max-w-[320px]
                    h-auto
                    bg-white
                    shadow-lg
                    overflow-hidden
                    
                `}>
                    {
                        expired ? 
                        expired.map((i:any, idx:number) => (
                            <div key={`expired-products-${idx}`} className="text-black flex border-b border-b-zinc-300 gap-1
                            !px-5 !py-[14px] cursor-pointer hover:bg-zinc-100 transition-all 
                            ">
                                <span className="text-[14px] self-end">{idx + 1}. </span>
                                <div className="flex justify-between flex-wrap w-full gap-3">
                                    <h5 className="font-semibold">{i.name}</h5>
                                    <span className="text-[15px]">(E4ab7b)</span>
                                </div>
                            </div>
                        )) : null
                    }
                </div>
            </div>
            

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