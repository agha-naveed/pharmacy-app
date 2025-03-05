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
}


export default function NewSell() {

    const [searchInput, setSearchInput] = useState<any>("")
    const [name, setName] = useState<any>('');
    const [wholeName, setWholeName] = useState<any>({});
    const [id, setId] = useState<string>('')
    const [focus, setFocus] = useState<boolean>(false)

    
    async function handleSearch(medName:string) {
        try {
            if(!medName.includes("\\")) {
                const res = await fetch(`http://localhost:8000/sell/api?query=${medName}`, {
                    method: "GET"
                });
                const data = await res.json()
                
                setName(data)
                console.log(data)
            }
        } catch(err) {
            console.log("try catch: "+err)
        }
    }
    async function handleInput(data:string) {
        setSearchInput(data)
    }
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
                console.log(data.fetchData)
            }
        }
        
        if(id) {
            sendData()
            setTimeout(() => {
                setFocus(false)
                setName("")
            }, 800)
        }

    }, [id])


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

        reset();
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
                        {...register("patient_name")} 
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
                                                }, 100)
                                            }}
                                        >
                                            <input type="text"
                                            className='w-full
                                            h-[35px]
                                            rounded-md !px-2
                                            border border-black
                                            '
                                            value={searchInput}
                                            onInput={(e:any) => {
                                                handleSearch(e.target.value)
                                                handleInput(e.target.value)
                                            }}
                                            />

                                            <ul className='
                                            absolute
                                            top-[35px]
                                            bg-zinc-200
                                            w-full
                                            rounded-lg
                                            '>
                                                {
                                                    name && focus ?
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
                                        value={"2"}
                                        {...register("pills_packet")} 
                                        />
                                    </div>

                                    <div className='grid'>
                                        <label htmlFor="">Price</label>
                                        <input type='number'
                                        className='w-24 h-[35px] cursor-pointer rounded-md !px-2 border border-black'
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

            <div className='c-scroll !px-2 overflow-x-scroll !mt-7'>
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
            </div>
        </div>
    )
}
