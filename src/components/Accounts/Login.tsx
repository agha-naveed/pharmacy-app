'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';


interface IFormInputs {
  username: string;
  password: string;
}

export default function page() {
    const redirect = useNavigate()

    const { register, handleSubmit } = useForm<IFormInputs>();
  
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
      const res = await fetch("/account/api", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if(res.status == 200) {
        redirect("/")
      }
      else {
        alert("Sorry! No User Found")
      }
    }

    
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-200 !p-5 rounded-lg'>
          <h3 className='text-2xl font-semibold text-center'>Login</h3>

          <div className='grid'>
            <label htmlFor="">Username</label>
            <input type="text"
            className='border border-zinc-500 rounded-md w-72 h-9 !px-2'
            {...register("username")}
            required
            />
          </div>
          <div className='grid !mt-3'>
            <label htmlFor="">Password</label>
            <input
            type="password"
            className='border border-zinc-500 rounded-md w-72 h-9 !px-2'
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
          !p-[6px]
          !mt-2
          cursor-pointer
          hover:bg-slate-900
          transition-all
          '
          >Submit!</button>
        </form>

        <Link
        to={"/account/signup"}
        className='justify-end w-full flex !py-1'>
          Click here to <span className='text-red-500 !mx-1 hover:underline'>Signup!</span>
        </Link>

      </div>

    </div>
  )
}