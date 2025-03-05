import React, { useEffect, useState } from 'react'
import Header from '../../extra-components/Header'
import { useForm } from 'react-hook-form';
import Select from 'react-select'


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
interface OptionType {
    value: string;
    label: string;
}
export default function NewSell() {


    const [options, setOptions] = useState<OptionType[]>([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<any>('');
    const [wholeName, setWholeName] = useState([]);

    

    const fetchOptions = async (inputValue: string) => {
        if (!inputValue || typeof inputValue !== "string") return;
    
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8000/sell/api?query=${inputValue}`, {
            method: "GET"
          });

          const medicines = await response.json();
    
          const formattedOptions: OptionType[] = medicines.map((medicine: { name: string }) => ({
            value: medicine.name,
            label: medicine.name,
          }
        
        ));
        
        setName(medicines)
        
    
          setOptions(formattedOptions);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const { register, handleSubmit, reset } = useForm<IFormInputs>();


    const [products, setProducts] = useState([{ id: 1 }]);

    const [productDetails, setProductDetails] = useState<any>([])


    const removeProduct = (id: number) => {
        
        setProducts(products.filter((product) => product.id !== id));

    };

    useEffect(() => {
        
    }, [name])

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
                                    <div className='grid relative w-full'>
                                        <label htmlFor="">Medicine Name</label>
                                        
                                        <Select
                                            placeholder="Search for medicine..."
                                            options={options}
                                            className='w-full'
                                            onInputChange={(inputValue) => {
                                                if (typeof inputValue === "string") {
                                                  fetchOptions(inputValue);
                                                }
                                              }}
                                            isLoading={loading}
                                            isClearable
                                        />
                                    </div>


                                    <div className='grid'>
                                        <label htmlFor="">Batch No.</label>
                                        <input type='text' className='w-40 h-[35px] cursor-pointer rounded-md !px-2 border border-black'
                                        {...register("batch_no")} 
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
