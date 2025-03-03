import Header from "../extra-components/Header"
import React, { useEffect, useState } from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Homepage() {

    const navigate = useNavigate()
  
    const [users, setUsers] = useState(0)

    useEffect(() => {

        async function getData() {
            
            const res = await fetch("/dashboard/api", { method: "GET" })

        if(res.status == 200) {
            const response = await res.json()

            console.log(response.totalUser)
            setUsers(response.totalUser)
        }
    }

    getData()
  }, [])

    return (
        <div className="w-full flex flex-col">
            <Header value={"Dashboard"} />
            <section className='flex gap-5 p-sec'>

                <div
                title='Create New Entry'
                className='
                shadow-md
                w-40
                h-36
                bg-purple-800
                rounded-lg
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                onClick={() => navigate("/dashboard")}>
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
                bg-teal-800
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                >
                    <h4 className='text-[32px] font-semibold'>11</h4>
                    <span>Today's Sell</span>
                </div>

                <div
                title="Total Users"
                className='
                w-40
                h-36
                rounded-lg
                bg-red-700
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                >
                    <h4 className='text-[32px] font-semibold'>{users}</h4>
                    <span>Total Users</span>
                </div>


            </section>
        </div>
    )
}