import { useEffect, useState } from 'react'
import Header from '../extra-components/Header'

export default function PendingPayments() {
    const [detail, setDetail] = useState<any>([])
    const [id, setId] = useState<any>("")
    const [edit, setEdit] = useState<any>()

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

    return (
        <div className='w-full overflow-hidden'>
            <Header value="Payment Status" />
            <div className='!p-1'>
                <section className='w-full overflow-x-auto !px-2 !pb-1 !mt-7'>
                    <div className="w-fit">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Supplier Name</th>
                                    <th>Medicine Name</th>
                                    <th>Batch No.</th>
                                    <th>Payment Status</th>
                                    <th>Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detail ?
                                    detail.map((i:any, idx:number) => (
                                        <tr key={`payment-status-${idx}`}>
                                            <td>{i.supplier_name}</td>
                                            <td>{i.name}</td>
                                            <td>{i.batch_no}</td>
                                            <td>{i.pay_method}</td>
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
                                    )) : null
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}
