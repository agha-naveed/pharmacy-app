import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from "react-router-dom";

interface IFormInputs {
  name: string;
  batch_no: string;
  stock: number;
  pay_method: string;
  supplier: string;
  packet_price: number;
  discount: number;
  pills_packet: number;
  date: string;
  pills_price: string;
  sell_pills_price: string;
  expiry_date: string;
  pills_stock: number;
}
export default function NewMedicine() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("q") || undefined;

    

    const { register, handleSubmit } = useForm<IFormInputs>();
    const [supplier, setSupplier] = useState([])


    const [product, setProduct] = useState({
        med: {
            name: undefined,
            batch_no: undefined,
            payment_method: undefined,
            stock: undefined,
            packet_price: undefined,
            pills_packet: undefined,
            pills_price: undefined,
            sell_pills_price: undefined,
            pills_stock: undefined,
            discount: undefined,
            expiry_date: undefined
        },
        suppliers: {
            name: undefined,
        }
    })


    let date = new Date()
    let onlyDate = (date.getDate()).toString().length == 1 ? `0${date.getDate()}` : date.getDate()
    let month = (date.getMonth() + 1).toString().length == 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

    let today = `${date.getFullYear()}-${month}-${onlyDate}`
    const [expiryDate, setExpiryDate] = useState(0);

    useEffect(() => {
        const fetchData = async () => {

            if(!id) {
                const res = await fetch("http://localhost:8000/medicine/api", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                const response = await res.json()
                if(response.message == 'ok') {
                    setSupplier(response.suppliers)
                    console.log("Sup")
                }
            }
            
            else {
                const res = await fetch(`http://localhost:8000/medicine/api?q=${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                })
                const response = await res.json()
                if(response.message == 'ok') {
                    console.log(response)
                    setProduct({
                        med: response.medicine,
                        suppliers: response.suppliers
                    })
                    setExpiryDate(response.medicine.expiry_date)
                }
                
            }
        }
        fetchData()
    }, [])


    
    const onSubmit = async (data: IFormInputs) => {
        const res = await fetch("http://localhost:8000/medicine/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        const response = await res.json()

        if(response.message == 'ok') {
            alert("✅ Medicine has been Added!")
            window.location.reload()
        }
        else {
            alert("❌ Error Occurred")
        }

    }


    return (
        <div className='p-sec'>
            <h3 className='text-2xl font-semibold !mb-5'>Add new Medicine</h3>

            <form onSubmit={handleSubmit(onSubmit)}
            className='w-[658px] grid gap-6 bg-zinc-600/5 shadow-lg rounded-lg !p-5'
            >
                <div className='flex gap-5'>
                    <div className='grid w-full'>
                        <label htmlFor="">Medicine Name</label>
                        <input
                        placeholder='e.g: Panadol'
                        type="text"
                        value={product ? product.med.name : ""}
                        className='
                            w-full
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("name")}
                        required />
                    </div>

                    <div className='grid w-full'>
                        <label htmlFor="">Batch #</label>
                        <input
                        value={product ? product.med.batch_no : ""}
                        placeholder='Batch No.'
                        type="text"
                        className='
                            w-full
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("batch_no")}
                        required
                         />
                    </div>

                </div>

                <div className='flex gap-5'>
                    
                    <div className='grid w-full'>
                        <label htmlFor="">Paymethod Method</label>
                        <select
                        className='
                        border
                        border-zinc-400
                        h-10
                        w-full
                        !px-2
                        rounded-md
                        '
                        {...register("pay_method")}
                        required
                        >
                            <option value="">-- select --</option>
                            <option value="cash">Cash</option>
                            <option value="credit">On Credit</option>
                        </select>
                    </div>

                    <div className='grid w-full'>
                        <label htmlFor="">Supplier</label>
                        <select
                        className='
                        border
                        border-zinc-400
                        h-10
                        w-full
                        !px-2
                        rounded-md
                        '
                        {...register("supplier")}
                        required
                        >
                            {
                                product.med.name ? 
                                <option value="">{product.suppliers.name}</option>
                                :
                                <>
                                    <option value="">-- select --</option>
                                    {
                                        supplier ?
                                            supplier.map((i:any, idx) => (
                                                <option value={i._id}
                                                key={`supplier-detail-${idx}`}>
                                                    {i.name}
                                                </option>
                                            ))
                                        : null
                                    }
                                </>
                            }
                            
                        </select>
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Stock</label>
                        <input
                        type="number"
                        min={0}
                        value={product.med.stock ? product.med.stock : ""}
                        className='
                            w-36
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("stock")}
                            />
                    </div>

                </div>

                <div className='flex gap-5'>
                    <div className='grid'>
                        <label htmlFor="">Packet Price</label>
                        <input
                        type="number"
                        value={product.med.packet_price ? product.med.packet_price : ""}
                        min={0}
                        className='
                            w-full
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("packet_price")}
                         />
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Pills in Packet</label>
                        <input
                        type="number"
                        value={product.med.pills_packet ? product.med.pills_packet : ""}
                        min={0}
                        className='
                            w-full
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("pills_packet")}
                         />
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Per Pill Price</label>
                        <input
                        type="number"
                        value={product.med.pills_price ? product.med.pills_price : ""}
                        min={0}
                        className='
                            w-full
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("pills_price")}
                         />
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Sell Pill Price</label>
                        <input
                        type="number"
                        value={product.med.sell_pills_price ? product.med.sell_pills_price : ""}
                        min={0}
                        className='
                            w-full
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("sell_pills_price")}
                         />
                    </div>
                    
                </div>

                <div className="flex gap-5">
                    <div className='grid'>
                        <label htmlFor="">Discount</label>
                        <input
                        type="number"
                        value={product.med.discount ? product.med.discount : 0}
                        min={0}
                        className='
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("discount")}
                         />
                    </div>

                    

                    <div className='grid'>
                        <label htmlFor="">Entry Date:</label>
                        <input
                        type="text"
                        readOnly
                        value={today}
                        min={0}
                        className='
                            border
                            w-full
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("date")}
                        required />
                    </div>

                    

                    <div className='grid'>
                        <label htmlFor="">Expiry Date</label>
                        <input
                        type="date"value={expiryDate} // Controlled state
                        // onChange={(e) => setExpiryDate(e.target.value)}
                        className='
                            w-full
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("expiry_date")}
                        onChange={(e:any) => setExpiryDate(e.target.value)}
                        required />
                    </div>

                </div>
                    
                <button className='
                text-white
                bg-slate-800
                rounded-lg
                !p-2
                transition-all
                hover:bg-slate-900
                cursor-pointer
                !mt-4
                '
                >
                    Submit
                </button>
                

            </form>
        </div>
    )
}