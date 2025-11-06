import React, { useState } from 'react'

function isValidEmail(email){
  // simple RFC-like email regex (sufficient for client-side validation)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function SignIn(){
  const [role, setRole] = useState('Manager')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)

  const emailValid = isValidEmail(email)

  function handleSubmit(e){
    e.preventDefault()
    setTouched(true)
    if(!emailValid){
      return
    }
    // placeholder - integrate auth logic later
    alert(`Signing in as ${role} with ${email}`)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-2">Sign in</h2>
        <p className="text-sm text-gray-500 mb-6">Sign in to your SmartOffice Core account</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              className="mt-1 block w-full rounded-md border px-3 py-2"
              placeholder="you@company.com"
            />
            {touched && !emailValid && (
              <p className="mt-1 text-sm text-red-600">Please enter a valid email address.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="••••••••" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <div className="flex gap-3">
              <label className={`px-3 py-2 rounded-md border ${role === 'Administrator' ? 'bg-purple-50 border-purple-300' : 'bg-white'}`}>
                <input type="radio" name="role" value="Administrator" className="mr-2" checked={role === 'Administrator'} onChange={() => setRole('Administrator')} />
                Administrator
              </label>
              <label className={`px-3 py-2 rounded-md border ${role === 'Manager' ? 'bg-purple-50 border-purple-300' : 'bg-white'}`}>
                <input type="radio" name="role" value="Manager" className="mr-2" checked={role === 'Manager'} onChange={() => setRole('Manager')} />
                Manager
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button disabled={!emailValid} type="submit" className={`px-6 py-2 rounded-full text-white ${emailValid ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-300 cursor-not-allowed'}`}>Sign in</button>
            <a className="text-sm text-gray-500 hover:underline" href="/signup">Need an account? Sign up</a>
          </div>
        </form>
      </div>
    </div>
  )
}
