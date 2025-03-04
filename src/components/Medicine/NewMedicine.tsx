import { useForm } from 'react-hook-form';


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

}
export default function NewMedicine() {
    const { register, handleSubmit } = useForm<IFormInputs>();
    
    const onSubmit = async (data: IFormInputs) => {
        await fetch("http://localhost:8000/medicine/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

    }

    var date = new Date()

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
                            <option value="">-- select --</option>
                            <option value="ali">Ali Medical Store</option>
                        </select>
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Stock</label>
                        <input
                        type="number"
                        min={0}
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
                        min={0}
                        className='
                            w-36
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
                        required />
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Per Pill Price</label>
                        <input
                        type="number"
                        min={0}
                        className='
                            w-36
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("pills_price")}
                        required />
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Sell Pill Price</label>
                        <input
                        type="number"
                        min={0}
                        className='
                            w-36
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("sell_pills_price")}
                        required />
                    </div>
                    
                </div>

                <div className="flex gap-5">
                    <div className='grid'>
                        <label htmlFor="">Discount</label>
                        <input
                        type="number"
                        min={0}
                        className='
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("discount")}
                        required />
                    </div>

                    

                    <div className='grid'>
                        <label htmlFor="">Entry Date:</label>
                        <input
                        type="text"
                        readOnly
                        value={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
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
                        type="date"
                        className='
                            w-full
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("expiry_date")}
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