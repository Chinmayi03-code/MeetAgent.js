import React from 'react'

export default function FeatureCard({title, desc, color='purple', icon=null}){
  const tint = {
    purple: 'from-purple-50 border-purple-100',
    pink: 'from-pink-50 border-pink-100',
    green: 'from-green-50 border-green-100'
  }[color] || 'from-gray-50'

  return (
    <div className={`p-6 rounded-xl shadow-sm border ${tint} bg-gradient-to-br to-white card-hover transition-transform duration-200`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm">
          {icon || <div className="text-2xl">✨</div>}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500 mt-2">{desc}</p>
        </div>
      </div>
    </div>
  )
}
