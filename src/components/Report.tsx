import { useState } from "react"
import Header from "../extra-components/Header"

export default function Report() {

    const [month, setMonth] = useState("*")
    const [user, setUser] = useState("*")
    const [year, setYear] = useState(0)
    const [option, setOption] = useState("")

    async function fetchData() {
        let obj = {
            month,
            user,
            year,
            option
        }

        const res = await fetch("http://localhost:8000/report/api", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }


    
    return (
        <div className="w-full flex flex-col">
            <Header value="Report" />
            <div className="p-sec">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                        <div className="grid">
                            <label htmlFor="">Select Month</label>
                            <select
                            onChange={(e:any) => setMonth(e.target.value)}
                            className="h-9 !px-2 rounded-md w-56 border">
                                <option value="*">-- select --</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>

                        <div className="grid">
                            <label htmlFor="">Select Year</label>
                            <select
                            onChange={(e:any) => setYear(e.target.value)}
                            className="h-9 !px-2 rounded-md w-32 border">
                                <option value="0">-- select --</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                            </select>
                        </div>

                        <div className="grid">
                            <label htmlFor="">Option</label>
                            <select
                            onChange={(e:any) => setOption(e.target.value)}
                            required
                            className="h-9 !px-2 rounded-md w-36 border">
                                <option value="">-- select --</option>
                                <option value="sell">Sell</option>
                                <option value="medicine">Medicines</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 items-end">
                        <div className="grid">
                            <label htmlFor="">Select User</label>
                            <select
                            onChange={(e:any) => setUser(e.target.value)}
                            className="h-9 !px-2 rounded-md w-56 border">
                                <option value="*">-- select --</option>
                                <option value="a">agha</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>

                        <button
                        className="bg-slate-800 w-32 h-10 cursor-pointer transition-all hover:bg-slate-900 text-white rounded-md"
                        onClick={() => fetchData()}
                        >
                            Check
                        </button>
                        
                    </div>
                </div>
            </div>


            <div className="p-sec">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Medicine Name</th>
                            <th>Batch No.</th>
                            <th>Qty</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Syed Naveed Abbas</td>
                            <td>Panadol Extra</td>
                            <td>E4#3r2</td>
                            <td>100</td>
                            <td>580</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}