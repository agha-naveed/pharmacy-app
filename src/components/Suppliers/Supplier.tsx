import Header from '../../extra-components/Header'
import { Outlet } from 'react-router-dom'

export default function Medicine() {
  return (
    <div className='w-full flex flex-col overflow-x-hidden'>
        <Header value="Suppliers" />
        <Outlet />
    </div>
  )
}