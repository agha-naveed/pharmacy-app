import Header from "../extra-components/Header"
import { useEffect, useState } from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";

export default function Homepage() {

    const navigate = useNavigate()
  
    const [details, setDetails] = useState({
        users: 0,
        stock: 0,
        sell: 0
    })
    const [chart, setChart] = useState<any>()
    const [supplier, setSupplier] = useState<any>()


    useEffect(() => {
        async function getData() {
            const res = await fetch("http://localhost:8000/dashboard/api", {
                method: "GET",
                credentials: "include"
            })
            const response = await res.json()
            
            if(response.message == 'ok') {
                setDetails({
                    users: response.users,
                    stock: response.medicines.length,
                    sell: response.sell
                })
                setChart(response.medicines)
                setSupplier(response.supplier)
            }
        }

    getData()
  }, [])



  ChartJS.register(ArcElement, Tooltip, Legend);
  let data;

  let arr:number[] = [];
  

  let totalSuppliers:string[] = []

  if(supplier) {
        for(let i=0; i<chart.length; i++) {
            arr.push(0)
        }
        
        supplier.map((i:any) => {
            totalSuppliers.push(i.name)
        })
        
        for(let i=0; i<chart.length; i++) {
            for(let j=0; j<supplier.length; j++) {
                if(supplier[j]._id == chart[i].supplier) {
                    arr[j]++;
                }
            }
        }
    }


  
  data = {
    labels: totalSuppliers,
    datasets: [
      {
        label: "Medicine from Suppliers",
        data: arr,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"],
        hoverOffset: 2,
      },
    ],
  };


  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

    return (
        <div className="w-full flex flex-col overflow-hidden">
            <Header value={"Dashboard"} />
            <section className='flex flex-wrap gap-5 p-sec'>

                <div
                title='Create New Entry'
                className='
                shadow-md
                w-40
                h-36
                transition-all
                bg-purple-800
                hover:bg-purple-900
                rounded-lg
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                onClick={() => navigate("/sell-new-entry")}>
                    <div className='h-[49px] content-center'>
                        <FaRegPlusSquare className='text-3xl' />
                    </div>
                    <span>Create New</span>
                </div>


                <div
                title="Today's Sell"
                className='
                w-40
                h-36
                rounded-lg
                transition-all
                bg-teal-800
                hover:bg-teal-900
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                >
                    <h4 className='text-[32px] font-semibold'>{details.sell}</h4>
                    <span>Today's Sell</span>
                </div>

                <div
                title="Total Users"
                className='
                w-40
                h-36
                rounded-lg
                transition-all
                bg-red-700
                hover:bg-red-800
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                >
                    <h4 className='text-[32px] font-semibold'>{details.users}</h4>
                    <span>Total Users</span>
                </div>

                <div
                title="Total Medicines"
                className='
                w-40
                h-36
                rounded-lg
                transition-all
                bg-cyan-600
                hover:bg-cyan-700
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                >
                    <h4 className='text-[32px] font-semibold'>{details.stock}</h4>
                    <span>Stock</span>
                </div>

                <div
                title="Total Medicines"
                className='
                w-40
                h-36
                rounded-lg
                transition-all
                bg-orange-400
                hover:bg-orange-500
                cursor-pointer
                flex
                flex-col
                items-center
                justify-center
                text-white text-center
                '
                onClick={() => navigate("/pending-payments")}
                >
                    <h4 className='text-[32px] font-semibold'>{details.stock}</h4>
                    <span>Pending Payment</span>
                </div>


            </section>

            <div className="w-fit items-center flex flex-col gap-5 !p-3 !mt-5">
                <Pie data={data} options={options} className="!w-[250px] !h-[250px]" />
                <label className="text-[22px] font-semibold">Medicines from Supplier</label>
            </div>
        </div>
    )
}