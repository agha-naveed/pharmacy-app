import { LuSearch } from "react-icons/lu";
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";


export default function MedicinePanel() {
    const navigate = useNavigate()
    const [medDetails, setMedDetails] = useState<any>([])

    const searchRef = useRef<any>(null)

    const [focus, setFocus] = useState(false)

    const [id, setId] = useState<string>("")
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const [rmId, setRmId] = useState(undefined)

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString() });
    };

    useEffect(() => {
        const removeMedicine = async() => {
            const res = await fetch(`http://localhost:8000/medicine-detail/api`, {
                method: "PUT",
                body: JSON.stringify({rmId}),
                headers: { "Content-Type": "application/json" },
            })
            const response = await res.json()

            if(response.message == 'ok') {
                setMedDetails((prev:any) => prev.filter((med:any) => med._id !== rmId))
            }
            else {
                alert("Some Error!")
            }
        }

        if(rmId)
            removeMedicine()

    }, [rmId])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/medicine-detail/api/?page=${page}`, {
            method: "GET"
            })
            
            const response = await res.json()
            console.log(response)

            if(response.message == 'ok') {
                setMedDetails(response.medicines)
                setTotalPrice(response.price)
            }
        }
        fetchData()
    }, [page])


    const searchQuery = async (q:string) => {
        const res = await fetch(`http://localhost:8000/medicine-detail/api?q=${q}`, {
            method: "GET",
            headers: {
            "Content-Type": 'application/json'
            }
        })

        
        const response = await res.json()
        console.log(response)

        if(response.message == 'ok') {
            setMedDetails(response.medicines)
            setTotalPrice(response.price)
        }

    }


    useEffect(() => {
        
        async function update() {
            navigate(`/medicine-panel/new-medicine?q=${id}`)
        }

        if(id.length > 0) {
            update()
        }

    }, [id])
    

    return (
        <div className="overflow-hidden">
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

            <div className="!px-10 flex flex-col">
                Total Price:
                <span className="font-semibold text-2xl">{totalPrice} Rs.</span>
            </div>

            <section className='w-full overflow-x-auto !px-2 !pb-1 !mt-7'>
                <div className="w-fit">
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Medicine Name</th>
                            <th>Batch No.</th>
                            <th>Pills in Packet</th>
                            <th>Pill/rs</th>
                            <th>Stock</th>
                            <th>Pills Stock</th>
                            <th>Supplier</th>
                            <th>Entry Date</th>
                            <th>Expiry Date</th>
                            <th>Update</th>
                            <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                medDetails ?
                                medDetails.map((i:any, idx:number) => (
                                
                                    <tr key={`medicine-display-${idx}`} className="hover:!bg-zinc-300">
                                        <td>{i.name}</td>
                                        <td>{i.batch_no}</td>
                                        <td>{i.pills_packet}</td>
                                        <td>{i.sell_pills_price}</td>
                                        <td>{i.stock}</td>
                                        <td>{i.pills_stock}</td>
                                        <td>{i.supplierName}</td>
                                        <td>{i.date}</td>
                                        <td>{i.expiry_date}</td>
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
                                            '
                                            onClick={() => {
                                                setId(i._id)
                                            }}
                                            >
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
                                            '
                                            onClick={() => {
                                                setRmId(i._id)
                                            }}
                                            >
                                            Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                : null
                            }
                        </tbody>
                    </table>
                    <div className="!p-2 justify-center flex gap-5">
                        <button
                        className={`cursor-pointer transition-all  text-white !py-[6px] !px-4 rounded-md
                            ${page == 1 ? "bg-zinc-500 hover:bg-zinc-700" : "bg-slate-800 hover:bg-slate-900"}    
                        `}
                        disabled={page == 1}
                        onClick={() => handlePageChange(page - 1)}
                        >
                            Prev
                        </button>
                        <button
                        className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-all text-white !py-[6px] !px-4 rounded-md"
                        onClick={() => handlePageChange(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
            
            
        </div>
    )
}