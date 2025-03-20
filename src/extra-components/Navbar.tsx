import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiPillFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiSolidUserAccount } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdPeopleAlt } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";


export default function Navbar() {
    const redirect = useNavigate()
    const location = useLocation()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8000/api", {
                method: "GET",
                credentials: 'include'
            })

            const response = await res.json()

            if(response.message != 'login') {
                alert("You are Not Logged in!!!")
                redirect("/account")
            }

            if(response.name == "admin") {
                setIsAdmin(true)
            }
        }
        fetchData()
    }, [])

    return (
        <div className='bg-slate-700 min-h-screen !w-[360px] !py-5'>
            <Link to={"/"} className='w-fit flex justify-self-center'>
                <img src={logo} className='spin w-24 select-none' alt='Logo' />
            </Link>
            <span className='text-center w-full block text-2xl !py-[5px] text-white font-bold select-none'>Agha Pharmacy</span>

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
                        location.pathname == "/sell-new-entry" ?
                            "bg-slate-800" :
                        location.pathname == "/pending-payments" ?
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
                    to={'/customers'}
                    className={`
                    text-white
                    flex text-xl
                    items-center
                    !px-[40px]
                    !py-[16px]
                    gap-2
                    transition-all
                    ${location.pathname == "/customers" ?
                        'bg-slate-800' :
                        location.pathname == "/customers/new-entry" ?
                            "bg-slate-800" :
                            "hover:bg-slate-600"
                        }
                    `}
                    >
                        <MdPeopleAlt className='text-2xl' />
                        Customers
                    </Link>
                </li>
                <li className='border-t border-t-white/10'>
                    <Link
                    to={'/sell'}
                    className={`
                    text-white
                    flex text-xl
                    items-center
                    !px-[40px]
                    !py-[16px]
                    gap-2
                    transition-all
                    ${location.pathname == "/sell" ?
                        'bg-slate-800' :
                        location.pathname == "/sell/new-sell-entry" ?
                            "bg-slate-800" :
                            "hover:bg-slate-600"
                        }
                    `}
                    >
                        <FaFileInvoiceDollar className='text-2xl' />
                        Sell
                    </Link>
                </li>
                <li className='border-t border-t-white/10'>
                    <Link
                    to={'/report'}
                    className={`
                    text-white
                    text-xl
                    items-center
                    !px-[40px]
                    !py-[16px]
                    gap-2
                    transition-all
                    ${isAdmin ? "flex" : "hidden"}
                    ${location.pathname == "/report" ?
                        'bg-slate-800' : "hover:bg-slate-600"
                        }
                    `}
                    >
                        <TbReportAnalytics className='text-2xl' />
                        Report
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
                        <CgProfile className='text-2xl' />
                        {isAdmin == true ? "Admin" : "Profile"}
                    </Link>
                </li>
            </ul>
        </div>
    )
}