import Header from '../extra-components/Header'

export default function PendingPayments() {
    
    return (
        <div className='w-full overflow-hidden'>
            <Header value="Payment Status" />
            <div className='!p-1'>
                <section className='w-full overflow-x-auto !px-2 !pb-1 !mt-7'>
                    <div className="w-fit">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Medicine Name</th>
                                    <th>Batch No.</th>
                                    <th>Supplier Name</th>
                                    <th>Payment Status</th>
                                    <th>✅ Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}
