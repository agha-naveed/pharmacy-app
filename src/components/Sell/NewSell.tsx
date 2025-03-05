import React, { useEffect, useState } from 'react'
import Header from '../../extra-components/Header'
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
    pills_price: number;
}


export default function NewSell() {
    
    const [searchInput, setSearchInput] = useState<string>("")
    const [name, setName] = useState<any>('');
    const [wholeName, setWholeName] = useState<any>({});
    const [id, setId] = useState<string>('')
    const [focus, setFocus] = useState<boolean>(false)
    const [totalPrice, setTotalPrice] = useState<number>()
    const [qty, setQty] = useState<number>()
    const [discount, setDiscount] = useState<number>()
    const [patientName, setPatientName] = useState<string>('')
    
    async function handleSearch(medName:string) {
        try {
            if(!medName.includes("\\")) {
                const res = await fetch(`http://localhost:8000/sell/api?query=${medName}`, {
                    method: "GET"
                });
                const data = await res.json()
                
                setName(data)
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
        console.log(discount)

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

    const [productDetails, setProductDetails] = useState<any>([])


    const removeProduct = (id: number) => {
        
        setProducts(products.filter((product) => product.id !== id));

    };

    async function saveData() {
        const date = new Date()

        const today = date.getDate()
        const month = (date.getMonth()) + 1
        const year = date.getFullYear()

        const finalDate = today + '/'+ month + '/' + year

        let obj = {
            patientName,
            productDetails,
            date: finalDate
        }
        
        const res = await fetch(`http://localhost:8000/sell/api`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json()

        if(data.message == 'ok') {
            // setWholeName(data.fetchData)
        }
        
        
    }

    const onSubmit = async (data: IFormInputs) => {
        

        if(productDetails.length != 0) {
            setProductDetails((prev:any) => [
                ...prev, {
                    medicine_name: searchInput,
                    batch_no: wholeName.batch_no,
                    quantity: data.quantity,
                    discount: data.discount,
                    total: totalPrice
                }
            ])
        }

        else {
            setProductDetails([{
                medicine_name: searchInput,
                batch_no: wholeName.batch_no,
                quantity: data.quantity,
                discount: data.discount,
                total: totalPrice
            }])
        }

    }


    return (
        
        <div className="w-full flex flex-col overflow-hidden">
            <Header value={"Dashboard"} />

            <section className='p-sec'>
                <h2 className='text-[28px] font-bold !mb-3'>Transaction Entry</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid !mb-7'>
                        <label htmlFor="">Patient Name</label>
                        <input type="text"
                        className='w-56 h-[35px] rounded-md !px-2 border border-black'
                        onInput={(e:any) => setPatientName(e.target.value)} 
                        />
                    </div>

                    {
                        products.map((_, idx) => (
                            <React.Fragment key={`add-item-${idx}`}>
                                <div className='flex !mt-8 justify-between w-[550px] h-fit'>
                                    <p>Product:</p>
                                    <button
                                    title='Save Data'
                                    type='submit'
                                    className='cursor-pointer underline text-orange-600'
                                    >
                                        Save
                                    </button>
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
                                            value={searchInput}
                                            onInput={async (e:any) => {
                                                setSearchInput(await e.target.value)
                                                handleSearch(await e.target.value)
                                            }}
                                            {...register("medicine_name")}
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
                    type='button'
                    onClick={saveData}
                    className='bg-slate-800 text-white !py-2 !px-7 rounded-lg cursor-pointer transition-all font-semibold text-[15px] !mt-4 hover:bg-slate-900'
                    >
                        Submit!
                    </button>
                </form>
            </section>

            <div className='c-scroll !px-2 overflow-x-scroll !mt-7 !mb-10'>
                {
                    productDetails.length > 0 ?
                        
                        <table className='overflow-x-auto'>
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
                                            <td>{i?.quantity ? i?.quantity : 1}</td>
                                            <td>{i?.discount ? i?.discount : 0}</td>
                                            <td>{totalPrice}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    : null
                }
            </div>
        </div>
    )
}
