import React, { useState } from 'react'
import Header from '../extra-components/Header'
import { useForm } from 'react-hook-form';

interface IFormInputs {
    patient_name: string;
    medicine_name: string;
    batch_no: string;
    pills_packet: number;
    price: number;
    discount: number;
    quantity: number;
    total: number;
}

export default function Dashboard() {


    const { register, handleSubmit, reset } = useForm<IFormInputs>();


    const [products, setProducts] = useState([{ id: 1 }]);

    const [productDetails, setProductDetails] = useState<any>([])


    const removeProduct = (id: number) => {
        
        setProducts(products.filter((product) => product.id !== id));

    };


    const onSubmit = async (data: IFormInputs) => {

        if(productDetails.length != 0) {
            setProductDetails((prev:any) => [
                ...prev, {
                    id: prev.length+1,
                    medicine_name: data.medicine_name,
                    batch_no: data.batch_no,
                    pills_packet: data.pills_packet,
                    price: data.price,
                    quantity: data.quantity,
                    discount: data.discount,
                    total: data.total
                }
            ])
        }

        else {
            setProductDetails([{
                id: 1,
                medicine_name: data.medicine_name,
                batch_no: data.batch_no,
                pills_packet: data.pills_packet,
                price: data.price,
                quantity: data.quantity,
                discount: data.discount,
                total: data.total
            }])
        }
        console.log(productDetails)
        reset();
    }

    return (
        
        <div className="w-full flex flex-col">
            <Header value={"Dashboard"} />

            <section className='p-sec'>
                <h2 className='text-[28px] font-bold !mb-3'>Transaction Entry</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid !mb-7'>
                        <label htmlFor="">Patient Name</label>
                        <input type="text"
                        className='w-56 h-[35px] rounded-md !px-2 border border-black'
                        {...register("patient_name")} 
                        />
                    </div>

                    {
                        productDetails.length > 0 ?
                            
                            <table >
                                <thead className='border'>
                                    <tr>
                                        <th>Medicine Name</th>
                                        <th>Batch No.</th>
                                        <th>Qty. in Packet</th>
                                        <th>Qty.</th>
                                        <th>Discount %</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productDetails.map((i:any, idx:number) => (
                                            <tr key={`daily-entry-${idx}`}>
                                                <td>{i?.medicine_name}</td>
                                                <td>{i?.batch_no}</td>
                                                <td>{i?.pills_packet}</td>
                                                <td>{i?.quantity}</td>
                                                <td>{i?.discount}</td>
                                                <td>{i?.total}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        : null
                    }

                    {
                        products.map((_, idx) => (
                            <React.Fragment key={`add-item-${idx}`}>
                                <div className='flex !mt-8 justify-between w-[550px] h-fit'>
                                    <p>Product: #{idx+1}</p>
                                    <button
                                    title='Save Data'
                                    type='submit'
                                    className='cursor-pointer underline text-orange-600'
                                    >
                                        Save
                                    </button>
                                </div>
                                
                                <div className='flex flex-wrap gap-y-4 gap-x-3 w-[550px] border-y border-y-black/35 !py-5'>
                                    <div className='grid'>
                                        <label htmlFor="">Medicine Name</label>
                                        <select className='w-56 h-[35px] rounded-md !px-2 border border-black'
                                        {...register("medicine_name")}
                                        >
                                            <option value="-">-- select --</option>
                                        </select>
                                    </div>


                                    <div className='grid'>
                                        <label htmlFor="">Batch No.</label>
                                        <select className='w-56 h-[35px] cursor-pointer rounded-md !px-2 border border-black'
                                        {...register("batch_no")} 
                                        >
                                            <option value="-">-- select --</option>
                                        </select>
                                    </div>

                                    <div className='grid'>
                                        <label htmlFor="">Packet</label>
                                        <input type='number' readOnly
                                        className='w-16 h-[35px] cursor-pointer rounded-md !px-2 border border-black' 
                                        value={"2"}
                                        {...register("pills_packet")} 
                                        />
                                    </div>

                                    <div className='grid'>
                                        <label htmlFor="">Price</label>
                                        <input type='number'
                                        className='w-20 h-[35px] cursor-pointer rounded-md !px-2 border border-black'
                                        readOnly min={0}
                                        {...register("price")} 
                                        />
                                    </div>

                                    <div className='grid'>
                                        <label htmlFor="">Qty</label>
                                        <input type='number'
                                        className='w-28 h-[35px] cursor-pointer rounded-md !px-2 border border-black' 
                                        min={0}
                                        {...register("quantity")} 
                                        />
                                    </div>

                                    <div className='grid'>
                                        <label htmlFor="">Discount</label>
                                        <div className='flex'>
                                            <input type='number'
                                            className='w-20 h-[35px] cursor-pointer rounded-md !pl-2 !pr-[26px] border border-black'
                                            min={0}
                                            {...register("discount")} 
                                            />
                                            <span className='relative right-6 text-[15px] top-[6px]'>%</span>
                                        </div>
                                    </div>

                                    <div className='grid relative right-3'>
                                        <label htmlFor="">Total</label>
                                        <div className='w-56 flex'>
                                            <input readOnly
                                            type='number'
                                            className='h-[35px] cursor-pointer rounded-md !pl-2 !pr-5 border border-black'
                                            {...register("total")} 
                                            />
                                            <span className='relative right-8 top-[6px]'>Rs.</span>
                                        </div>
                                    </div>

                                </div>    
                            </React.Fragment>
                        ))
                    }


                    <button
                    type='submit'
                    className='bg-slate-800 text-white !py-2 !px-7 rounded-lg cursor-pointer transition-all font-semibold text-[15px] !mt-4 hover:bg-slate-900'
                    >
                        Submit!
                    </button>
                </form>
            </section>
        </div>
    )
}
