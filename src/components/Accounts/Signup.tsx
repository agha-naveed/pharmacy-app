'use client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';


interface IFormInputs {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}

export default function Signup() {
    const { register, handleSubmit } = useForm<IFormInputs>();

    const redirect = useNavigate()

    useEffect(() => {
      async function checkLogin() {
        const res = await fetch("/account/api", {
          method: "GET"
        })

        const data = await res.json()

        if(data.message != 'ok') {
          alert("You are Already Logged In!")
          redirect("/")
        }
      }

      checkLogin()
    }, [])
      
    const onSubmit = async (data: IFormInputs) => {
        const res = await fetch("/account/signup/api", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        })

        if(res.status == 201) {
            alert("Successfully Added Data...")
        }
    }

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-200 !p-5 rounded-lg'>
          <h3 className='text-2xl font-semibold text-center'>Signup</h3>

            <div className='flex gap-2 !mt-2'>
                <div className='grid'>
                <label htmlFor="">First Name</label>
                <input
                type="text"
                className='border border-zinc-500 rounded-md w-48 h-9 !px-2'
                {...register("first_name")}
                />
                </div>
                
                <div className='grid'>
                <label htmlFor="">Last Name</label>
                <input
                type="text"
                className='border border-zinc-500 rounded-md w-48 h-9 !px-2'
                {...register("last_name")}
                />
                </div>
            </div>


            <div className='grid !mt-2'>
                <label htmlFor="">Username</label>
                <input
                type="text"
                className='border border-zinc-500 rounded-md w-full h-9 !px-2'
                {...register("username")}
                required
                />
            </div>


            <div className='grid !mt-2'>
                <label htmlFor="">Password</label>
                <input
                type="password"
                className='border border-zinc-500 rounded-md w-full h-9 !px-2'
                {...register("password")}
                required
                />
            </div>

          <button
          type='submit'
          className='
          text-center
          bg-slate-800
          text-white
          w-full
          rounded-lg
          !p-2
          !mt-2
          cursor-pointer
          hover:bg-slate-900
          transition-all
          '
          >Submit!</button>
        </form>

        <Link
        to={"/account"}
        className='justify-end w-full flex !py-1'>
          Click here to <span className='text-red-500 !mx-1 hover:underline'>Login!</span>
        </Link>

      </div>

    </div>
  )
}