import { useEffect, useState, useRef } from 'react'
import Header from '../extra-components/Header'
import { LuSearch } from "react-icons/lu";
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function PendingPayments() {
    const [detail, setDetail] = useState<any>([])
    const [id, setId] = useState<any>("")
    const [focus, setFocus] = useState<boolean>(false)
    const searchRef = useRef<any>(null)

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:8000/payments/api", {
                method: "GET"
            })
            const response = await res.json()

            if(response.message == 'ok') {
                console.log(response)
                setDetail(response.pay)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function updateData() {
            const res = await fetch("http://localhost:8000/payments/api", {
                method: "PATCH",
                body: JSON.stringify({id}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response = await res.json()
            if(response.message == 'ok') {
                setDetail((prev:any) => prev.filter((med:any) => med.batch_no !== id))
            }
        }
        updateData()
    }, [id])

    
    const searchQuery = async (q:string) => {
        const res = await fetch(`http://localhost:8000/payments/api?q=${q}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            }
        })

        
        const response = await res.json()

        if(response.message === 'ok') {
            setDetail(response.data)
        }
        if(response.message === 'error') {
            alert("Some Error Occurred!")
        }

    }

    return (
        <div className='w-full overflow-hidden'>
            <Header value="Payment Status" />
            <div className='!p-1'>

                <div className='flex justify-between p-sec'>
                    <div className='flex items-center' 
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    >
                        <input
                        type="text"
                        className={`
                        border
                        border-black
                        outline-orange-500
                        h-10
                        !pl-2
                        !pr-9
                        rounded-lg
                        transition-all
                        ${focus ? "w-96" : 'w-52'}
                        `}
                        ref={searchRef}
                        onInput={(e:any) => searchQuery(e.target.value)}
                        title='Search Bar'
                        placeholder='Click to Search...'
                        />
                        <button className={`
                            text-[22px]
                            !py-2
                            !px-3
                            relative
                            right-11
                            rounded-r-lg
                            cursor-pointer
                            text-white border
                            ${focus ? "border-orange-500" : "border-black"}
                            bg-orange-500
                            hover:bg-orange-600
                            transition-all
                            `} title='Search'
                            onClick={() => searchRef.current ? searchQuery(searchRef.current.value) : ""}
                            >
                            <LuSearch />
                        </button>
                    </div>
                    
                    <button
                    onClick={() => navigate("/medicine-panel/new-medicine")}
                    className='flex gap-2 cursor-pointer hover:bg-slate-900 transition-all items-center bg-slate-800 text-white rounded-full w-fit !px-7 !py-[10px] self-end'>
                    <FaRegPlusSquare className='text-xl' />
                    <span>Add New Entry</span>
                    </button>
                </div>
                
                <section className='w-full overflow-x-auto !px-2 !pb-1 !mt-7'>
                    <div className="w-fit">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Supplier Name</th>
                                    <th>Medicine Name</th>
                                    <th>Batch No.</th>
                                    <th>Payment Status</th>
                                    <th>Price</th>
                                    <th>Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detail.length > 0 ?
                                    detail.map((i:any, idx:number) => (
                                        <tr key={`payment-status-${idx}`}>
                                            <td>{i.supplier_name}</td>
                                            <td>{i.name}</td>
                                            <td>{i.batch_no}</td>
                                            <td>{i.pay_method}</td>
                                            <td>
                                                {
                                                    i.pay_method == "partial" ?
                                                    (i.pills_price * i.pills_stock) - i.partial_price :
                                                    i.pills_price * i.pills_stock
                                                }
                                            </td>
                                            <td>
                                                <button
                                                className='
                                                cursor-pointer
                                                transition-all
                                                hover:brightness-90
                                                '
                                                onClick={() => setId(i.batch_no)}
                                                >
                                                    ✅
                                                </button>
                                            </td>
                                        </tr>
                                    )) :
                                    <>
                                        <tr>
                                            <td colSpan={5} className='!border-none text-center text-xl font-semibold'>No Data Found!</td>
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}
