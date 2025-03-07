import React, { useEffect, useState } from 'react'
import Header from '../../extra-components/Header'
import { useForm } from 'react-hook-form';

interface IFormInputs {
    customer_name: string;
    patient_name: string;
    medicine_name: string;
    batch_no: string;
    pills_packet: number;
    price: number;
    discount: number;
    quantity: number;
    total: number;
    pills_price: number;
}


export default function NewSell() {
    
    const [searchInput, setSearchInput] = useState<string>("")
    const [name, setName] = useState<any>('');
    const [wholeName, setWholeName] = useState<any>({});
    const [id, setId] = useState<string>('')
    const [focus, setFocus] = useState<boolean>(false)
    const [totalPrice, setTotalPrice] = useState<number>()
    const [qty, setQty] = useState<number>(1)
    const [discount, setDiscount] = useState<number>(0)
    const [patientName, setPatientName] = useState<string>('')
    const [customers, setCustomers] = useState<any>()
    

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/sell/api`, {
                method: "PUT"
            });
            const data = await res.json()
            
            if(data.message == 'ok') {
                setCustomers(await data.customers)
            }
        }

        fetchData()
    }, [])


    async function handleSearch(medName:string) {
        try {
            if(!medName.includes("\\")) {
                const res = await fetch(`http://localhost:8000/sell/api?query=${medName}`, {
                    method: "GET"
                });
                const data = await res.json()
                
                setName(data.medicines)
            }
        } catch(err) {
            console.log("try catch: "+err)
        }
    }
    
    useEffect(() => {
        let pillPrice = wholeName.sell_pills_price

        if(qty && !discount && pillPrice) {
            setTotalPrice(pillPrice * qty)
        }

        if(qty && discount && pillPrice) {
            setTotalPrice((pillPrice * qty) - ((pillPrice * qty) * (discount/100)))
        }

        if(discount && !qty && pillPrice) {
            setTotalPrice((pillPrice) - ((pillPrice) * (discount/100)))
        }

    }, [discount, qty])


    useEffect(() => {
        const sendData = async () => {
            let obj = {
                id
            }
            const res = await fetch(`http://localhost:8000/sell/api`, {
                method: "PATCH",
                body: JSON.stringify(obj),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json()

            if(data.message == 'ok') {
                setWholeName(data.fetchData)
            }
            setTotalPrice(data.fetchData.sell_pills_price)
        }
        
        if(id) {
            sendData()
            setTimeout(() => {
                setName("")
            }, 800)
        }


    }, [id])


    const { register, handleSubmit } = useForm<IFormInputs>();

    const [products, setProducts] = useState([{ id: 1 }]);



    const removeProduct = (id: number) => {
        
        setProducts(products.filter((product) => product.id !== id));

    };

    

    const onSubmit = async (data: IFormInputs) => {
        
        let date = new Date()
        let onlyDate = (date.getDate()).toString().length == 1 ? `0${date.getDate()}` : date.getDate()
        let month = (date.getMonth() + 1).toString().length == 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

        let finalDate = `${date.getFullYear()}-${month}-${onlyDate}`

        let obj = {}

        if(data.customer_name == '-') {
            obj = {
                patientName,
                medicine_name: searchInput,
                batch_no: wholeName.batch_no,
                quantity: data.quantity,
                pills_packet: wholeName.pills_packet,
                pills_price: wholeName.sell_pills_price,
                discount: data.discount,
                total: totalPrice,
                date: finalDate
            }
        }
        else {
            obj = {
                id: data.customer_name,
                medicine_name: searchInput,
                batch_no: wholeName.batch_no,
                quantity: data.quantity,
                pills_packet: wholeName.pills_packet,
                pills_price: wholeName.sell_pills_price,
                discount: data.discount,
                total: totalPrice,
                date: finalDate
            }
        }

        


        console.log(obj)

        const res = await fetch(`http://localhost:8000/sell/api`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" },
        });

        const res_data = await res.json()

        if(res_data.message == 'ok') {
            alert("✅ Done")
            // window.location.reload()
        }

    }


    return (
        
        <div className="w-full flex flex-col overflow-hidden">
            <Header value={"Dashboard"} />

            <section className='p-sec'>
                <div className='flex justify-between'>
                    <h2 className='text-[28px] font-bold !mb-3'>Transaction Entry</h2>
                    <button
                    type='button'
                    className='bg-slate-800 text-white !py-[10px] !px-7 rounded-lg cursor-pointer transition-all font-semibold text-[15px] !mt-4 hover:bg-slate-900'
                    >
                        Continue
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-5'>
                        <div className='grid !mb-7'>
                            <label htmlFor="">New Patient Name</label>
                            <input type="text"
                            className='w-56 h-[35px] rounded-md !px-2 border border-black'
                            onInput={(e:any) => setPatientName(e.target.value)} 
                            />
                        </div>
                        <div className='grid !mb-7'>
                            <label htmlFor="">Patient Name</label>
                            <select
                            className='h-[35px] border border-black rounded-md w-56 !px-2'
                            {...register("customer_name")}
                            >
                                <option value="-">-- select --</option>
                                {
                                    customers ?
                                    customers.map((item:any, index:Number) => (
                                        <option value={item._id} key={`customers-detail-${index}`}>{item.name}</option>
                                    )) : ""
                                }
                            </select>
                        </div>
                    </div>

                    {
                        products.map((_, idx) => (
                            <React.Fragment key={`add-item-${idx}`}>
                                <div className='flex !mt-8 justify-between w-[550px] h-fit'>
                                    <p>Product:</p>
                                    
                                </div>
                                
                                <div className='flex flex-wrap gap-y-4 gap-x-3 w-[550px] border-y border-y-black/35 !py-5'>
                                    <div className='grid w-full'>
                                        <label htmlFor="">Medicine Name</label>
                                        <div className='relative'
                                            onFocus={() => {
                                                setFocus(true)
                                            }}
                                            onBlur={() => {
                                                setTimeout(() => {
                                                    setFocus(false)
                                                }, 500)
                                            }}
                                        >
                                            <input type="text"
                                            className='w-[550px]
                                            h-[35px]
                                            rounded-md !px-2
                                            border border-black
                                            '
                                            value={searchInput || ""}
                                            onInput={async (e:any) => {
                                                setSearchInput(await e.target.value)
                                                handleSearch(await e.target.value)
                                            }}
                                            {...register("medicine_name")}
                                            required
                                            />

                                            <ul className={`
                                            absolute
                                            top-[35px]
                                            bg-zinc-200
                                            w-[550px]
                                            rounded-lg
                                            z-10
                                            ${focus ? "grid": "hidden"}
                                            `}>
                                                {
                                                    name ?
                                                    name.map((i:any, idx:number) => (
                                                        <li
                                                        className='!px-2
                                                        !py-[6px]
                                                        cursor-pointer
                                                        hover:bg-zinc-300
                                                        '
                                                        key={`medicine-name-${idx}`}
                                                        onClick={() => {
                                                            setId(i._id)
                                                            setSearchInput(i.name)
                                                        }}
                                                        >
                                                            {i.name}
                                                        </li>
                                                    ))
                                                    : null
                                                }
                                            </ul>
                                        </div>
                                    </div>


                                    <div className='grid'>
                                        <label htmlFor="">Batch No.</label>
                                        <input type='text' className='w-40 h-[35px] cursor-pointer rounded-md !px-2 border border-black'
                                        {...register("batch_no")}
                                        value={wholeName.batch_no ? wholeName.batch_no : ""}
                                        readOnly
                                        />
                                        
                                    </div>

                                    <div className='grid'>
                                        <label htmlFor="">Pills in Packet</label>
                                        <input type='number' readOnly
                                        className='w-[100px] h-[35px] cursor-pointer rounded-md !px-2 border border-black' 
                                        value={wholeName.pills_packet}
                                        {...register("pills_packet")} 
                                        />
                                    </div>

                                    <div className='grid'>
                                        <label htmlFor="">Pills Price</label>
                                        <input type='number'
                                        className='w-24 h-[35px] cursor-pointer rounded-md !px-2 border border-black'
                                        readOnly min={0}
                                        value={wholeName.sell_pills_price}
                                        {...register("pills_price")}
                                        />
                                    </div>

                                    <div className='grid'>
                                        <label htmlFor="">Qty</label>
                                        <div className='flex'>
                                            <input type='number'
                                            className='w-28 h-[35px] cursor-pointer rounded-md !px-2 border border-black'
                                            value={qty}
                                            onInput={(e:any) => setQty(e.target.value)}
                                            min={0}
                                            {...register("quantity")}
                                            />
                                            <span className='relative right-10 top-[7px] text-zinc-500 text-[15px]'>/200</span>
                                        </div>
                                    </div>

                                    <div className='grid'>
                                        <label htmlFor="">Discount</label>
                                        <div className='flex'>
                                            <input type='number'
                                            className='w-20 h-[35px] cursor-pointer rounded-md !pl-2 !pr-[26px] border border-black'
                                            min={0}
                                            value={discount}
                                            onInput={(e:any) => setDiscount(e.target.value)}
                                            {...register("discount")} 
                                            />
                                            <span className='relative right-6 text-[15px] top-[6px]'>%</span>
                                        </div>
                                    </div>

                                    <div className='grid relative right-3'>
                                        <label htmlFor="">Total</label>
                                        <div className='w-56 flex'>
                                            <input readOnly
                                            value={totalPrice}
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
                    title='Save Data'
                    type='submit'
                    className='cursor-pointer hover:underline bg-orange-600
                    text-white !py-2 !px-6 rounded-md font-semibold !mt-2
                    '
                    >
                        Save
                    </button>
                </form>
            </section>

        </div>
    )
}
