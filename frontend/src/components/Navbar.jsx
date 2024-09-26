import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div> {/* Header Section */}
    <header className="bg-blue-900 text-white p-4 flex justify-between">
      <h1 className="text-xl">Distributor Management System</h1>
      <div className="text-sm">
        <p>Welcome W A A U WIJESING...</p>
        <p>Last Login 24/09/2024 21:37:54</p>
      </div>
    </header>

    {/* Navigation Bar */}
    <nav className="bg-blue-800 text-white py-2">
      <ul className="flex justify-around">
      <Link to={'/dashboard'}><li>Dashboard</li></Link>
        <li>Customer</li>
        <li>Promotion</li>
        <Link to={'/orders'}><li>Order</li></Link>
        <li>Inventory</li>
        <li>Sales</li>
        <li>Return</li>
        <li>Complain</li>
      </ul>
    </nav>
</div>
  )
}
