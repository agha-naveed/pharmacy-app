import { LuSearch } from "react-icons/lu";
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function CustomerHistory() {
   
    const navigate = useNavigate()

    const [details, setDetails] = useState([])

    const [focus, setFocus] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch("http://localhost:8000/customer/api", {
          method: "GET"
        })
        
        const response = await res.json()

        if(response.message == 'ok') {
            setDetails(response.data)
        }

      }
      fetchData()
    }, [])

    return (
        <div className="overflow-hidden">
            <div className='flex justify-between p-sec'>
                <div className='flex items-center'>
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
                    ${focus ? "w-96" : 'w-48'}
                    `}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    title='Search Bar'
                    placeholder='Click to Search...'
                    />
                    <button
                    className={`
                        text-[22px]
                        !py-2
                        !px-3
                        relative
                        right-11
                        rounded-r-lg
                        cursor-pointer
                        text-white border border-black
                        bg-orange-500
                        hover:bg-orange-600
                        transition-all
                        `} title='Search'>
                        <LuSearch />
                    </button>
                </div>
                
                <button
                onClick={() => navigate("/customers/new-entry")}
                className='flex gap-2 cursor-pointer hover:bg-slate-900 transition-all items-center bg-slate-800 text-white rounded-full w-fit !px-7 !py-[10px] self-end'>
                <FaRegPlusSquare className='text-xl' />
                <span>Add New Entry</span>
                </button>
            </div>

            <section className='c-scroll w-full overflow-x-auto !px-2 !pb-1 !mt-7'>
                <table className="table">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Medicine Name</th>
                        <th>Batch No.</th>
                        <th>Pill/rs</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Entry Date</th>
                        <th>Update</th>
                        <th>Print</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        details ?
                        details.map((i:any, idx) => (
                        
                            <tr key={`medicine-display-${idx}`}>
                                <td>{i.patient_name}</td>
                                <td>{i.medicine_name}</td>
                                <td>{i.batch_no}</td>
                                <td>{i.pills_price}</td>
                                <td>{i.quantity}</td>
                                <td>{i.total}</td>
                                <td>{i.date}</td>
                                <td>
                                    <button className='
                                    bg-green-700
                                    !py-2
                                    !px-4
                                    rounded-md
                                    text-white
                                    text-[14.5px]
                                    cursor-pointer
                                    hover:bg-green-800
                                    transition-all
                                    '>
                                    Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                    onClick={() => window.open(`/print/${i.batch_no}`, "_blank")}
                                    className='
                                    bg-blue-600
                                    !py-2
                                    !px-4
                                    rounded-md
                                    text-white
                                    text-[14.5px]
                                    cursor-pointer
                                    hover:bg-blue-800
                                    transition-all
                                    '>
                                    Print
                                    </button>
                                </td>
                            </tr>
                        ))
                        : null
                    }
                </tbody>
                </table>
            </section>
        </div>
    )
}