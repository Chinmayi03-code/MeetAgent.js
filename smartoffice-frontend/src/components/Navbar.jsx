import React from 'react'
import { NavLink } from 'react-router-dom'

function Logo(){
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.9"/>
          <path d="M8 9h8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div>
        <div className="font-semibold text-lg">SmartOffice Core</div>
        <div className="text-xs text-gray-400">AI-Powered Meeting Scheduler</div>
      </div>
    </div>
  )
}

const links = [
  {to: '/', label: 'Home'},
  {to: '/schedule', label: 'Schedule'},
]

export default function Navbar(){
  return (
    <header className="w-full shadow-sm bg-white sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-4">
            {links.map(l => (
              <NavLink 
                key={l.to}
                to={l.to}
                end
                className={({isActive}) => `px-3 py-2 rounded-md font-medium ${isActive ? 'text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow' : 'text-gray-600 hover:text-gray-900'}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <NavLink to="/signin" className="px-4 py-2 rounded-md bg-white border text-sm font-medium text-gray-700 hover:bg-gray-50">Sign in</NavLink>
            <NavLink to="/signup" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow">Sign up</NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}
