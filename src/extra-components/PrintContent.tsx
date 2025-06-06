import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from "react-to-print";
import { useParams } from 'react-router-dom';
import logo from '../assets/logo.png'
import sign from '../assets/img/Narf_signature.png'
import qr from '../assets/img/qr-code.png'


export default function PrintContent() {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const [total, setTotal] = useState({
        price: 0,
        quantity: 0,
        unitPrice: 0
    })

    const [data, setData] = useState<any>([])
    const [cell, setCell] = useState<string>("")

    let { id, date } = useParams()

    useEffect(() => {
        let price = 0;
        let quantity = 0;
        let unitPrice = 0;

        if(data.length > 0) {
            data.map((i:any) => {
                price += i.total
                quantity += i.quantity
                unitPrice += i.pills_price
            })

            setTotal({
                price,
                quantity,
                unitPrice
            })
        }

    }, [data])

    useEffect(() => {
        

        const fetchData = async () => {
            let response = await fetch(`http://localhost:8000/print/${id}/date/${date}/api`, {
                method: "GET",
                credentials: "include"
            })
            let res = await response.json()

            if(res.message == "ok") {
                console.log(res.data)
                setData(res.data)
                setCell(res.cell ? res.cell : "")
            }
            else {
                alert("Some Error Occurred!")
            }
        }

        fetchData()

    }, [])

    useEffect(() => {
        setTimeout(() => {
            reactToPrintFn()
        }, 400)
    }, [total])

    return (
        <section className='flex justify-center items-center !p-10 bg-zinc-400'>
            <div ref={contentRef}
            className='flex flex-col justify-between relative !p-20 min-w-[794px] w-[794px] min-h-[1123px] h-[1123px] bg-white shadow-2xl gap-10'>
                <img src={logo}
                    className='w-[70%] absolute opacity-5 top-[20%] left-1/2 -translate-x-1/2'
                    alt="Ali Medical Store Logo" />

                <div className='relative z-20 w-full h-fit flex items-center justify-between'>
                    <img src={logo}
                    className='w-40'
                    alt="Ali Medical Store Logo" />
                    <div className='flex items-center gap-5'>
                        <span className='block h-[2px] w-40 bg-black'></span>
                        <h3 className='text-[55px]'>Invoice</h3>
                    </div>
                </div>

                <div className='relative z-20 flex justify-between'>
                    <div>
                        <h4 className='font-semibold'>BILLED TO:</h4>
                        <span>{data[0]?.patient_name}</span>
                        <br />
                        <span>{cell ? cell : ""}</span>
                        
                    </div>
                    <div className='relative z-20 flex flex-col'>
                        <h4 className='font-semibold text-end'>INVOICE DETAIL</h4>
                        <div className='flex gap-4 text-[15px]'>
                            <h4 className='font-semibold'>DATE:</h4>
                            <span>{data[0]?.date}</span>
                        </div>
                        
                    </div>
                </div>

                <div className='!mb-10'>
                    <table className='relative z-20 !w-full p-table'>
                        <thead className='h-[50px] content-center'>
                            <tr className='border-b font-semibold text-[15px]'>
                                <td className='!w-[46%] !border-none'>ITEM</td>
                                <td className='!border-none'>UNIT PRICE</td>
                                <td className='!border-none'>QTY</td>
                                <td className='!border-none'>TOTAL</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data ?
                                data.map((item:any, index:number) => (
                                    <tr key={`invoice-${index}`} className='text-[15px]'>
                                        <td className='!w-[46%] !border-none'>{item.medicine_name}</td>
                                        <td className='!border-none'>{item.pills_price} Rs.</td>
                                        <td className='!border-none'>{item.quantity}</td>
                                        <td className='!border-none'>{item.total} Rs.</td>
                                    </tr>
                                )) : null
                            }
                        </tbody>
                        <tfoot>
                            <tr className='text-[14px] font-semibold border-t'>
                                <td className='!w-[46%] !border-none'>SUBTOTAL</td>
                                <td className='!border-none'>{total.unitPrice} Rs.</td>
                                <td className='!border-none'>{total.quantity}</td>
                                <td className='!border-none'>{total.price} Rs.</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div>
                    <img src={qr} className='w-[100px] absolute bottom-20 outline-2 outline-offset-2' alt="" />
                </div>
                <div className='w-fit flex flex-col absolute bottom-20 right-20 items-center'>
                    <img src={sign} className='w-32' alt="" />
                    <span className='block w-40 h-[1px] bg-black'></span>
                    <span className='!mt-2'>Signature</span>
                </div>
            </div>
        </section>
    )
}