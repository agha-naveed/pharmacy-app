import Header from "../extra-components/Header"

export default function Report() {
    return (
        <div className="w-full flex flex-col">
            <Header value="Report" />
            <div className="p-sec">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                        <div className="grid">
                            <label htmlFor="">Select Month</label>
                            <select name="" id="" className="h-9 !px-2 rounded-md w-56 border">
                                <option value="-">-- select --</option>
                                <option value="0">January</option>
                                <option value="1">February</option>
                                <option value="2">March</option>
                                <option value="3">April</option>
                                <option value="4">May</option>
                                <option value="5">June</option>
                                <option value="6">July</option>
                                <option value="7">August</option>
                                <option value="8">September</option>
                                <option value="9">October</option>
                                <option value="10">November</option>
                                <option value="11">December</option>
                            </select>
                        </div>

                        <div className="grid">
                            <label htmlFor="">Select Year</label>
                            <select name="" id="" className="h-9 !px-2 rounded-md w-32 border">
                                <option value="-">-- select --</option>
                                <option value="0">2025</option>
                                <option value="1">2026</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 items-end">
                        <div className="grid">
                            <label htmlFor="">Select User</label>
                            <select name="" id="" className="h-9 !px-2 rounded-md w-56 border">
                                <option value="-">-- select --</option>
                                <option value="0">2025</option>
                                <option value="1">2026</option>
                            </select>
                        </div>

                        <button
                        className="bg-slate-800 w-32 h-10 cursor-pointer transition-all hover:bg-slate-900 text-white rounded-md"
                        >
                            Check
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}