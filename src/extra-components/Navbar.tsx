import { useEffect } from 'react'
import logo from '../assets/img/logo.png'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { PiPillFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiSolidUserAccount } from "react-icons/bi";


export default function Navbar() {
    const redirect = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api", {
                method: "GET"
            })
            if(res.status != 200) {
                alert("You are Not Logged in!!!")
                redirect("/account")
            }
        }
        fetchData()
    }, [])

    return (
        <div className='bg-slate-700 min-h-screen !w-[360px] !py-5'>
            <Link to={"/"} className='w-fit flex justify-self-center'>
                <img src={logo} className='spin w-36 select-none' alt='Logo' />
            </Link>
            <span className='text-center w-full block text-2xl !py-[5px] text-white font-bold select-none'>Ali Medical Store</span>

            <ul className='!mt-5 grid border-y border-y-white/25'>
                <li>
                    <Link
                    to={'/'}
                    className={`
                    text-white
                    flex text-xl
                    items-center
                    !px-[40px]
                    !py-[16px]
                    gap-2
                    transition-all
                    ${location.pathname == "/" ?
                            'bg-slate-800' :
                        location.pathname == "/dashboard" ?
                            "bg-slate-800" :
                            "hover:bg-slate-600"
                        }
                    `}
                    >
                        <MdOutlineSpaceDashboard className='text-2xl' />
                        Dashboard
                    </Link>
                </li>
                <li className='border-t border-t-white/10'>
                    <Link
                    to={'/medicine-panel'}
                    className={`
                    text-white
                    flex text-xl
                    items-center
                    !px-[40px]
                    !py-[16px]
                    gap-2
                    transition-all
                    ${location.pathname == "/medicine-panel" ?
                        'bg-slate-800' :
                        location.pathname == "/medicine-panel/new-medicine" ?
                            "bg-slate-800" :
                            "hover:bg-slate-600"
                        }
                    `}
                    >
                        <PiPillFill className='text-2xl' />
                        Medicine Panel
                    </Link>
                </li>
                <li className='border-t border-t-white/10'>
                    <Link
                    to={'/suppliers'}
                    className={`
                    text-white
                    flex text-xl
                    items-center
                    !px-[40px]
                    !py-[16px]
                    gap-2
                    transition-all
                    ${location.pathname == "/suppliers" ?
                        'bg-slate-800' :
                        location.pathname == "/suppliers/new-supplier" ?
                            "bg-slate-800" :
                            "hover:bg-slate-600"
                        }
                    `}
                    >
                        <BiSolidUserAccount className='text-2xl' />
                        Suppliers
                    </Link>
                </li>
                <li className='border-t border-t-white/10'>
                    <Link
                    to={'/setting'}
                    className={`
                    text-white
                    flex text-xl
                    items-center
                    !px-[40px]
                    !py-[16px]
                    gap-2
                    transition-all
                    ${location.pathname == "/setting" ?
                        'bg-slate-800' : "hover:bg-slate-600"
                        }
                    `}
                    >
                        <IoSettings className='text-2xl' />
                        Setting
                    </Link>
                </li>
            </ul>
        </div>
    )
}