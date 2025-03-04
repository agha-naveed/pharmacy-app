import { useForm } from 'react-hook-form';

interface IFormInputs {
  fullname: string;
  email: string;
  cnic: string;
  cell: string;
  gender: string;
  company: string;
  date: string;
}

export default function NewSupplier() {
    const { register, handleSubmit } = useForm<IFormInputs>();
    
    const onSubmit = async (data: IFormInputs) => {

      const res = await fetch("http://localhost:8000/supplier/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      const response = await res.json()

      if(response.message == 'ok') {
        alert("New Supplier Added Successfully")
      }
      else {
        alert("Some Error Occurred!")
      }
    }

    var date = new Date()

    return (
        <div className='p-sec'>
            <h3 className='text-2xl font-semibold !mb-5'>Add new Supplier</h3>

            <form onSubmit={handleSubmit(onSubmit)}
            className='w-[500px] grid gap-3 bg-zinc-600/5 shadow-lg rounded-lg !p-5'
            >
                <div className='flex gap-5'>
                    <div className='grid'>
                        <label htmlFor="">Full Name</label>
                        <input
                        placeholder='e.g: Syed Naveed'
                        type="text"
                        className='
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("fullname")}
                        required />
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Email</label>
                        <input
                        placeholder='e.g: ali@gmail.com'
                        type="email"
                        className='
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("email")}
                         />
                    </div>
                </div>

                <div className='grid'>
                        <label htmlFor="">CNIC</label>
                        <input
                        placeholder='Without Dashed (-)'
                        type="number"
                        maxLength={13}
                        min={0}
                        className='
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("cnic")}
                         />
                    </div>

                <div className='flex gap-5'>
                    <div className='grid'>
                        <label htmlFor="">Gender</label>
                        <select
                        className='
                        border
                        border-zinc-400
                        h-10
                        !px-2
                        rounded-md
                        '
                        {...register("gender")}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Cell No.</label>
                        <input
                        placeholder='03*********'
                        type="number"
                        min={0}
                        className='
                            border
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("cell")}
                         />
                    </div>
                    <div className='grid'>
                        <label htmlFor="">Date:</label>
                        <input
                        type="text"
                        readOnly
                        value={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                        min={0}
                        className='
                            border
                            w-28
                            border-zinc-400
                            h-10
                            !px-2
                            rounded-md
                        '
                        {...register("date")}
                        required />
                    </div>
                </div>

                <div className='grid'>
                    <label htmlFor="">Company Name</label>
                    <input
                    placeholder='e.g: Ali Medical Store'
                    type="text"
                    min={0}
                    className='
                        border
                        border-zinc-400
                        h-10
                        !px-2
                        rounded-md
                    '
                    {...register("company")}
                    required />
                </div>
                    
                <button className='
                text-white
                bg-slate-800
                rounded-lg
                !p-2
                transition-all
                hover:bg-slate-900
                cursor-pointer
                '
                >
                    Submit
                </button>
                

            </form>
        </div>
    )
}