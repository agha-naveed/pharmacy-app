import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './components/Homepage.tsx'
import Dashboard from './components/Dashboard.tsx'
import Medicine from './components/Medicine/Medicine.tsx'
import MedicinePanel from './components/Medicine/MedicinePanel.tsx'
import NewMedicine from './components/Medicine/NewMedicine.tsx'
import Supplier from './components/Suppliers/Supplier.tsx'
import SupplierPanel from './components/Suppliers/SupplierPanel.tsx'


let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "medicine-panel",
        element: <Medicine />,
        children: [
          {
            index: true,
            element: <MedicinePanel />
          },
          {
            path: "new-medicine",
            element: <NewMedicine />
          }
        ]
      },
      {
        path: "suppliers",
        element: <Supplier />,
        children: [
          {
            index: true,
            element: <SupplierPanel />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)