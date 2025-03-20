import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function SupplierPanel() {
    const navigate = useNavigate()

    const [details, setDetails] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch("http://localhost:8000/supplier/api", {
          method: "GET"
        })
        const response = await res.json()
        if(response.message == 'ok') {
            setDetails(response.suppliers)
        }

      }
      fetchData()
    }, [])

    return (
        <div className="overflow-hidden">
            <div className='flex justify-end p-sec'>
                <button
                onClick={() => navigate("/suppliers/new-supplier")}
                className='flex gap-2 cursor-pointer hover:bg-slate-900 transition-all items-center bg-slate-800 text-white rounded-full w-fit !px-7 !py-[10px] self-end'>
                <FaRegPlusSquare className='text-xl' />
                <span>Add New Entry</span>
                </button>
            </div>

            <section className='w-full overflow-x-auto !px-2 !pb-1 !mt-7'>
                <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>CNIC</th>
                        <th>Gender</th>
                        <th>Cell No.</th>
                        <th>Company</th>
                        <th>Entry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        details ?
                        details.map((i:any, idx:number) => (
                            <tr key={`suppliers-page-${idx}`}>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.cnic}</td>
                                <td>{i.gender}</td>
                                <td>{i.cell}</td>
                                <td>{i.company}</td>
                                <td>{i.date}</td>
                            </tr>
                        )) : "<span>No Details<span/>"
                    }
                </tbody>
                </table>
            </section>
        </div>
    )
}