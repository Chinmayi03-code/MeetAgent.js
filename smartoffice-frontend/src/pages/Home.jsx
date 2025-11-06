import React from 'react'

export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/60 via-white to-pink-50/40">

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-white/60 to-white/40">
          {/* Subtle purple-pink backdrop */}
          <div className="bg-gradient-to-tr from-purple-50 to-pink-50 p-12 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="order-2 md:order-1">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                  Schedule Meetings in Natural Language
                </h1>
                <p className="mt-4 text-gray-600 max-w-lg">SmartOffice Core uses AI to schedule, propose times, and route approvals automatically — simply tell it what you need.</p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-700">Get Started</button>
                  <button className="inline-flex items-center px-6 py-3 rounded-full bg-white border text-gray-700 hover:bg-gray-50">View Dashboard</button>
                </div>
              </div>

              <div className="order-1 md:order-2 flex justify-center md:justify-end">
                <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5">
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" alt="Professional employees working in office" className="w-full h-64 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
