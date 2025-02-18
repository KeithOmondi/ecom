import React from 'react'

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img src="https://centumre.co.ke/wp-content/uploads/2023/10/CentumreDarklogo.png" alt="Admin Logo" className="h-10 w-auto" />
        
      </div>

      {/* Right: Admin Details */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-800">
          <span className="sr-only">Notifications</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V10a6 6 0 00-12 0v4c0 .386-.148.735-.405 1.005L4 17h5m6 0a3 3 0 11-6 0"
            ></path>
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2">
          <img
            src="data:image/jpeg;base64,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"
            alt="Admin"
            className="h-8 w-8 rounded-full border-2 border-gray-300"
          />
          <span className="text-gray-800 font-medium">Admin</span>
        </div>

        {/* Logout Button */}
        <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
  )
}

export default AdminHeader