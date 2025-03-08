import Header from "../extra-components/Header"
import { useEffect, useState } from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Homepage() {

    const navigate = useNavigate()
  
    const [details, setDetails] = useState({
        users: 0,
        stock: 0,
        sell: 0
    })

    useEffect(() => {

        async function getData() {
            
            const res = await fetch("http://localhost:8000/dashboard/api", {
                method: "GET",
                credentials: "include"
            })
            const response = await res.json()
            
            if(response.message == 'ok') {
                setDetails({
                    users: response.users,
                    stock: response.medicines,
                    sell: response.sell
                })
            }
        }

    getData()
  }, [])

    return (
        <div className="w-full flex flex-col overflow-hidden">
            <Header value={"Dashboard"} />
            <section className='flex gap-5 p-sec'>

                <div
                title='Create New Entry'
                className='
                shadow-md
                w-40
                h-36
                transition-all
                bg-purple-800
                hover:bg-purple-900
                rounded-lg
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                onClick={() => navigate("/sell-new-entry")}>
                    <div className='h-[49px] content-center'>
                        <FaRegPlusSquare className='text-3xl' />
                    </div>
                    <span>Create New</span>
                </div>


                <div
                title="Today's Sell"
                className='
                w-40
                h-36
                rounded-lg
                transition-all
                bg-teal-800
                hover:bg-teal-900
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                >
                    <h4 className='text-[32px] font-semibold'>{details.sell}</h4>
                    <span>Today's Sell</span>
                </div>

                <div
                title="Total Users"
                className='
                w-40
                h-36
                rounded-lg
                transition-all
                bg-red-700
                hover:bg-red-800
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                >
                    <h4 className='text-[32px] font-semibold'>{details.users}</h4>
                    <span>Total Users</span>
                </div>

                <div
                title="Total Medicines"
                className='
                w-40
                h-36
                rounded-lg
                transition-all
                bg-cyan-600
                hover:bg-cyan-700
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                >
                    <h4 className='text-[32px] font-semibold'>{details.stock}</h4>
                    <span>Stock</span>
                </div>


            </section>
        </div>
    )
}