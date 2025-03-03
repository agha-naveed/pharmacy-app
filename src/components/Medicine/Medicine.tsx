import Header from '../../extra-components/Header'
import { Outlet } from 'react-router-dom'

export default function Medicine() {
  return (
    <div className='flex flex-col'>
        <Header value="Medicine Panel" />
        <div className='p-sec'>
          <Outlet />
        </div>
    </div>
  )
}