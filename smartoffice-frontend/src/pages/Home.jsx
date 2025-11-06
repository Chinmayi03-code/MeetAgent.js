import React from 'react'
import FeatureCard from '../components/FeatureCard'

export default function Home(){
  return (
    <div className="space-y-12">
      <section className="text-center pt-8">
        <div className="inline-block px-4 py-1 rounded-full bg-purple-50 text-purple-600 text-sm">⭐ AI-Powered Scheduling</div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mt-6">Powerful Features</h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Everything you need to manage meetings efficiently and effortlessly.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="gradient-btn text-white px-6 py-3 rounded-full shadow">Get Started</button>
          <button className="px-6 py-3 rounded-full border">View Dashboard</button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-center mb-6">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard color="purple" title="Natural Language" desc="Just type your meeting request in plain English. No complex forms or scheduling jargon needed." icon={<div className="text-2xl">🗣️</div>} />
          <FeatureCard color="pink" title="Auto-Approval" desc="Smart routing with automated approval workflows. Get meetings approved faster than ever." icon={<div className="text-2xl">⚡</div>} />
          <FeatureCard color="green" title="Calendar Sync" desc="Automatically syncs with Google Calendar. No manual updates or double-booking worries." icon={<div className="text-2xl">📅</div>} />
        </div>
      </section>
    </div>
  )
}
