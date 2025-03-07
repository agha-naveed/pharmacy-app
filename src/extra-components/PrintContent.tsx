import { useEffect, useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import logo from '../assets/img/logo.png'


export default function PrintContent() {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    useEffect(() => {
        const fetchData = async () => {
            
        }

        // reactToPrintFn()
    }, [])
    return (
        <section className='flex justify-center items-center !p-10 bg-zinc-400'>
            <div ref={contentRef}
            className='flex flex-col !p-20 min-w-[794px] w-[794px] min-h-[1123px] h-[1123px] bg-zinc-100 shadow-2xl gap-10'>
                <div className='w-full h-fit flex items-center justify-between'>
                    <img src={logo}
                    className='w-40'
                    alt="Ali Medical Store Logo" />
                    <div className='flex items-center gap-5'>
                        <span className='block h-[2px] w-40 bg-black'></span>
                        <h3 className='text-[55px]'>Invoice</h3>
                    </div>
                </div>

                <div className='!py-16 flex justify-between'>
                    <div>
                        <h4 className='font-semibold'>BILLED TO:</h4>
                        <span>Agha Naveed</span>
                    </div>
                    <div className='flex gap-5'>
                        <div className='font-semibold'>
                            <h4>INVOICE NO:</h4>
                            <h4>DATE:</h4>
                        </div>
                        <div className='grid text-start'>
                            <span>123</span>
                            <span>2025-12-31</span>
                        </div>
                        
                    </div>
                </div>

                <div>
                    <table className='!w-full p-table'>
                        <thead className='h-[50px] content-center'>
                            <tr className='border-b font-semibold text-[15px]'>
                                <td className='!w-[46%] !border-none'>ITEM</td>
                                <td className='!border-none'>UNIT PRICE</td>
                                <td className='!border-none'>QTY</td>
                                <td className='!border-none'>TOTAL</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className='text-[15px]'>
                                <td className='!w-[46%] !border-none'>Panadol Extra</td>
                                <td className='!border-none'>10 rs</td>
                                <td className='!border-none'>5</td>
                                <td className='!border-none'>2000 rs</td>
                            </tr>

                            <tr className='text-[15px]'>
                                <td className='!w-[46%] !border-none'>ITEM</td>
                                <td className='!border-none'>UNIT PRICE rs</td>
                                <td className='!border-none'>QTY</td>
                                <td className='!border-none'>1500 rs</td>
                            </tr>

                            <tr className='text-[15px]'>
                                <td className='!w-[46%] !border-none'>ITEM</td>
                                <td className='!border-none'>UNIT PRICE rs</td>
                                <td className='!border-none'>QTY</td>
                                <td className='!border-none'>1500 rs</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className='text-[14px] font-semibold border-t'>
                                <td className='!w-[46%] !border-none'>SUBTOTAL</td>
                                <td className='!border-none'>200 rs</td>
                                <td className='!border-none'>200</td>
                                <td className='!border-none'>50000 Pkr</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    )
}