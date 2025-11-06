import React, { useState } from 'react'

function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function SignUp(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Manager')
  const [touched, setTouched] = useState(false)

  const emailValid = isValidEmail(email)

  function handleSubmit(e){
    e.preventDefault()
    setTouched(true)
    if(!emailValid || !name.trim()){
      return
    }
    // placeholder - integrate registration logic later
    alert(`Signing up ${name} (${email}) as ${role}`)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
        <p className="text-sm text-gray-500 mb-6">Start using SmartOffice Core to manage meetings with AI.</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="Your name" />
            {touched && !name.trim() && <p className="mt-1 text-sm text-red-600">Please enter your name.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Work email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setTouched(true)} className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="you@company.com" />
            {touched && !emailValid && <p className="mt-1 text-sm text-red-600">Please enter a valid email address.</p>}
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
            <button type="submit" disabled={!emailValid || !name.trim()} className={`px-6 py-2 rounded-full text-white ${emailValid && name.trim() ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-300 cursor-not-allowed'}`}>Create account</button>
            <a className="text-sm text-gray-500 hover:underline" href="/signin">Already have an account? Sign in</a>
          </div>
        </form>
      </div>
    </div>
  )
}
