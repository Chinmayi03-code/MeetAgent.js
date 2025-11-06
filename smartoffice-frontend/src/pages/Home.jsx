import React, { useState } from 'react'
import FeatureCard from '../components/FeatureCard'

export default function Home(){
  const [showSignIn, setShowSignIn] = useState(false)
  const [role, setRole] = useState('Manager')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar with signup / signin on the right */}
      <header className="max-w-7xl mx-auto px-6 py-4 flex justify-end items-center">
        <nav className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Sign up</button>

          <div className="relative">
            <button
              onClick={() => setShowSignIn(s => !s)}
              className="px-4 py-2 rounded-md bg-white border text-sm font-medium shadow-sm flex items-center gap-2"
            >
              Sign in
              <svg className={`w-4 h-4 transform ${showSignIn ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
            </button>

            {showSignIn && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-2 z-20">
                <button
                  onClick={() => { setRole('Administrator'); setShowSignIn(false) }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >Administrator</button>
                <button
                  onClick={() => { setRole('Manager'); setShowSignIn(false) }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >Manager</button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Hero area: image left, title and CTAs on right (title should appear on the right side) */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: professional office image */}
          <div className="order-1 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1350&q=80"
              alt="Employees working professionally in an office"
              className="w-full rounded-xl shadow-lg object-cover max-h-96"
            />
          </div>

          {/* Right: Title (Meet Agent AI) and actions */}
          <div className="order-2 md:order-2 text-right">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm">⭐ AI-Powered Scheduling</div>
            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900">Meet Agent AI</h1>
            <p className="mt-4 text-gray-600 max-w-xl ml-auto">An intelligent assistant that schedules, routes approvals and keeps your team coordinated — fast and reliably.</p>

            <div className="mt-8 flex justify-end gap-4">
              <button className="px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">Get Started</button>
              <button className="px-6 py-3 rounded-full border bg-white">View Dashboard</button>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              {role && <span>Signed in as: <strong className="text-gray-700">{role}</strong></span>}
            </div>
          </div>
        </div>

        {/* Features section (keep existing FeatureCards) */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-center mb-6">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard color="purple" title="Natural Language" desc="Just type your meeting request in plain English. No complex forms or scheduling jargon needed." icon={<div className="text-2xl">🗣️</div>} />
            <FeatureCard color="pink" title="Auto-Approval" desc="Smart routing with automated approval workflows. Get meetings approved faster than ever." icon={<div className="text-2xl">⚡</div>} />
            <FeatureCard color="green" title="Calendar Sync" desc="Automatically syncs with Google Calendar. No manual updates or double-booking worries." icon={<div className="text-2xl">📅</div>} />
          </div>
        </section>
      </main>
    </div>
  )
}
