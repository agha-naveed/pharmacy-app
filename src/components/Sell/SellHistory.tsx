import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function SellHistory() {
   
    const navigate = useNavigate()

    const [medDetails, setMedDetails] = useState<any>([])

    const [toDate, setToDate] = useState<string>('')
    const [fromDate, setFromDate] = useState<string>('')
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch("http://localhost:8000/sell-history/api", {
          method: "GET",
          credentials: "include"
        })
        
        const response = await res.json()


        if(response.message == 'ok') {
            setMedDetails(response.details)
            console.log(response.details)
        }

      }
      fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/sell-history/api?from=${fromDate}+to=${toDate}`, {
              method: "PATCH",
              credentials: "include"
            })
            
            const response = await res.json()
    
            console.log(response)
    
            if(response.message == 'ok') {
                setMedDetails(response.data)
            }
            
          }
          if(fromDate)
            fetchData()

    }, [fromDate])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/sell-history/api?from=${fromDate}&to=${toDate}`, {
              method: "PATCH",
              credentials: "include"
            })
            
            const response = await res.json()
    
            if(response.message == 'ok') {
                setMedDetails(response.data)
                console.log(response.details)
            }
    
          }
          if(toDate)
          fetchData()

    }, [toDate])
    
    useEffect(() => {
        let price = 0;
        for(let i=0; i<medDetails.length; i++) {
            price += medDetails[i].total
        }

        setTotal(price)
    }, [medDetails])

    return (
        <div className="overflow-hidden">
            <div className='flex justify-between p-sec'>
                <div className="flex gap-3">
                    <div className="grid">
                        <label htmlFor="">From</label>
                        <input type="date"
                        className="border h-9 !px-2 rounded-md"
                        onChange={(e:any) => setFromDate(e.target.value)}
                        />
                    </div>
                    <div className="grid">
                        <label htmlFor="">To</label>
                        <input type="date"
                        className="border h-9 !px-2 rounded-md"
                        onChange={(e:any) => setToDate(e.target.value)}
                        />
                    </div>
                </div>
                <button
                onClick={() => navigate("/sell-new-entry")}
                className='flex gap-2 cursor-pointer hover:bg-slate-900 transition-all items-center bg-slate-800 text-white rounded-full w-fit !px-7 !py-[10px] self-end'>
                <FaRegPlusSquare className='text-xl' />
                <span>Add New Entry</span>
                </button>
            </div>
            <h4 className="relative -top-2 grid !px-10 !pt-1">
                Total Price:
                <span className="text-2xl font-semibold">{total} Rs.</span>
            </h4>
            <section className='w-full overflow-x-auto !px-2 !pb-1 !mt-7 relative -top-4'>
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
                        <th>Print</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        medDetails ?
                        medDetails.map((i:any, idx:number) => (
                        
                            <tr key={`medicine-display-${idx}`}>
                                <td>{i.patient_name}</td>
                                <td>{i.medicine_name}</td>
                                <td>{i.batch_no}</td>
                                <td>{i.pills_price}</td>
                                <td>{i.quantity}</td>
                                <td>{i.total}</td>
                                <td>{i.date}</td>
                                <td>
                                    <button
                                    onClick={() => i.id ? window.open(`/print/${i.id}/date/${i.date}`, "_blank") : window.open(`/print/${i.patient_name}+p_w_id_name/date/${i.date}`, "_blank")}
                                    className={`
                                    !py-2
                                    !px-4
                                    rounded-md
                                    text-white
                                    text-[14.5px]
                                    cursor-pointer
                                    ${i.id ? `
                                        bg-blue-600
                                        hover:bg-blue-800` 
                                        : "bg-zinc-600"
                                    }
                                    transition-all
                                    `}
                                    >
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