import { LuSearch } from "react-icons/lu";
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function MedicinePanel() {
    const navigate = useNavigate()

    const [focus, setFocus] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch("/medicine-panel/api", {
          method: "GET"
        })

      }
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
                    <button className={`
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
                onClick={() => navigate("/medicine-panel/new-medicine")}
                className='flex gap-2 cursor-pointer hover:bg-slate-900 transition-all items-center bg-slate-800 text-white rounded-full w-fit !px-7 !py-[10px] self-end'>
                <FaRegPlusSquare className='text-xl' />
                <span>Add New Entry</span>
                </button>
            </div>

            <section className='c-scroll w-full overflow-x-auto !px-2 !pb-1 !mt-7'>
                <table>
                <thead>
                    <tr>
                    <th>Medicine Name</th>
                    <th>Batch No.</th>
                    <th>Pills in Packet</th>
                    <th>Pill/rs</th>
                    <th>Stock</th>
                    <th>Pills Stock</th>
                    <th>Entry Date</th>
                    <th>Expiry Date</th>
                    <th>Update</th>
                    <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Panadol</td>
                    <td>12ba</td>
                    <td>20</td>
                    <td>28</td>
                    <td>1000</td>
                    <td>20000</td>
                    <td>20/8/2024</td>
                    <td>01/5/2024</td>
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
                        <button className='
                        bg-red-700
                        !py-2
                        !px-4
                        rounded-md
                        text-white
                        text-[14.5px]
                        cursor-pointer
                        hover:bg-red-800
                        transition-all
                        '>
                        Remove
                        </button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </section>
        </div>
    )
}