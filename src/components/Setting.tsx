'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Header from '../extra-components/Header';

interface IFormInputs {
    first_name: string;
    last_name: string;
    username: string;
}


export default function page() {

    const [details, setDetails] = useState<IFormInputs>({
        first_name: "",
        last_name: "",
        username: ""
    })

    const { register, handleSubmit, setValue } = useForm<IFormInputs>({
        defaultValues: {
            first_name: "",
            last_name: "",
            username: ""
        },
    });
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8000/setting/api", { method: "GET" });
                if (res.status === 200) {
                    const data = (await res.json()).userdata;
                    Object.keys(data).forEach((key) => {
                        setValue(key as keyof IFormInputs, data[key]);
                    });
                } else {
                    alert("Something went wrong!");
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, [setValue]);

    const onSubmit = async (data: IFormInputs) => {
        let obj = {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username
        }
        let changes = confirm("Click OK to Confirm Changes!")

        if(changes) {
            const res = await fetch("/setting/api", {
                method: "PUT",
                body: JSON.stringify(obj)
            })
        }

    }

    return (
        <div className='flex flex-col w-full'>
            <Header value="Setting" />
            <div className='p-sec !mt-10 grid justify-center items-center gap-3'>
                <h3 className='font-semibold text-3xl text-center'>Setting</h3>
                <form onSubmit={handleSubmit(onSubmit)} className='w-72 grid gap-3 border border-zinc-400 rounded-lg !p-4'>
                    <div className='grid'>
                        <label htmlFor="">First Name</label>
                        <input
                        type="text"
                        className='border border-zinc-300 h-8 !px-2 rounded-md'
                        {...register("first_name")} />
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Last Name</label>
                        <input type="text"
                        className='border border-zinc-300 h-8 !px-2 rounded-md'
                        {...register("last_name")} />
                    </div>


                    <div className='grid'>
                        <label htmlFor="">Username</label>
                        <input type="text"
                        className='border border-zinc-300 h-8 !px-2 rounded-md'
                        {...register("username")} />
                    </div>

                    <button type='submit' className='bg-slate-800 text-white rounded-lg !p-2 cursor-pointer hover:bg-slate-900 transition-all'>Submit</button>

                </form>

            </div>
        </div>
    )
}