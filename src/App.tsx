import { Outlet } from "react-router-dom"
import Navbar from "./extra-components/Navbar"

export default function App() {
  return (
    <div className="flex w-full">
      <Navbar />
      <Outlet />
    </div>
  )
}