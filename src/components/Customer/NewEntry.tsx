import React from 'react'
import { useForm } from 'react-hook-form';


interface IFormInputs {
    name: string;
    cell: string;
    date: string;
  }

export default function NewEntry() {
    const { register, handleSubmit } = useForm<IFormInputs>();

    let date = new Date()
    let onlyDate = (date.getDate()).toString().length == 1 ? `0${date.getDate()}` : date.getDate()
    let month = (date.getMonth() + 1).toString().length == 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

    let today = `${date.getFullYear()}-${month}-${onlyDate}`


    const onSubmit = async (data: IFormInputs) => {
        let obj = {
            name: data.name,
            cell: data.cell,
            date: data.date
        }

        const res = await fetch("http://localhost:8000/customer/api", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if((await res.json()).message == "ok") {
            alert("Customer Added")
        }
        else {
            alert("Error")
        }
    }

    return (
        <div className='p-sec'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-7'>
                    <div className='grid'>
                        <label htmlFor="">Full Name</label>
                        <input
                        type="text"
                        className='border h-9 !px-2 rounded-md w-fit'
                        {...register("name")}
                        />
                    </div>
                    <div className='grid'>
                        <label htmlFor="">Date</label>
                        <input
                        type="text"
                        value={today}
                        className='border h-9 !px-2 rounded-md w-fit'
                        {...register("date")}
                        readOnly
                        />
                    </div>
                </div>
                
                <div className='grid !mt-3'>
                    <label htmlFor="">Contact No.</label>
                    <input
                    type="number"
                    className='border h-9 !px-2 rounded-md w-fit'
                    {...register("cell")}
                    />
                </div>
                <button type='submit'
                className='
                text-white
                bg-slate-800
                hover:bg-slate-900
                cursor-pointer
                transition-all
                !mt-4
                !py-2 !px-6 rounded-md
                '>Submit</button>
            </form>
        </div>
    )
}