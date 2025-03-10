import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './components/Homepage.tsx'
import NewSell from './components/Sell/NewSell.tsx'
import Setting from './components/Setting.tsx'
import Medicine from './components/Medicine/Medicine.tsx'
import MedicinePanel from './components/Medicine/MedicinePanel.tsx'
import NewMedicine from './components/Medicine/NewMedicine.tsx'
import Supplier from './components/Suppliers/Supplier.tsx'
import SupplierPanel from './components/Suppliers/SupplierPanel.tsx'
import NewSupplier from './components/Suppliers/NewSupplier.tsx'
import Account from './components/Accounts/Account.tsx'
import Login from './components/Accounts/Login.tsx'
import Signup from './components/Accounts/Signup.tsx'
import Sell from './components/Sell/Sell.tsx'
import SellHistory from './components/Sell/SellHistory.tsx'
import PrintContent from './extra-components/PrintContent.tsx'
import Customer from './components/Customer/Customer.tsx'
import CustomerHistory from './components/Customer/CustomerHistory.tsx'
import NewEntry from './components/Customer/NewEntry.tsx'
import Report from './components/Report.tsx'



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
        path: "sell-new-entry",
        element: <NewSell />
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
          },
          {
            path: "new-supplier",
            element: <NewSupplier />
          }
        ]
      },
      {
        path: "customers",
        element: <Customer />,
        children: [
          {
            index: true,
            element: <CustomerHistory />
          },
          {
            path: "new-entry",
            element: <NewEntry />
          }
        ]
      },
      {
        path: "setting",
        element: <Setting />
      },
      {
        path: "sell",
        element: <Sell />,
        children: [{
          index: true,
          element: <SellHistory />
        }]
      },
      {
        path: "report",
        element: <Report />
      }
    ]
  },
  {
    path: "account",
    element: <Account />,
    children: [{
      index: true,
      element: <Login />
    }, {
      path: 'signup',
      element: <Signup />
    }]
  },
  {
    path: "print/:id/date/:date",
    element: <PrintContent />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)