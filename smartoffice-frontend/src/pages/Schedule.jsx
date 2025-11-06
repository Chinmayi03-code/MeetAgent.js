import React, {useState} from 'react'

export default function Schedule(){
  const [text, setText] = useState('')
  const [status, setStatus] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('loading')
    try{
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({query: text})
      })
      if(!res.ok) throw new Error('Network error')
      await res.json()
      setStatus('success')
      setText('')
    }catch(err){
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Schedule a meeting</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Describe your meeting (e.g. 'Meet with John next Tuesday 2-3pm to discuss Q4 goals')" className="w-full border rounded-md p-3 h-36"></textarea>
        <div className="flex items-center gap-3">
          <button className="gradient-btn text-white px-4 py-2 rounded-md shadow" type="submit">Send</button>
          {status === 'loading' && <span className="text-gray-500">Sending…</span>}
          {status === 'success' && <span className="text-green-600">Sent — check dashboard soon.</span>}
          {status === 'error' && <span className="text-red-600">Error sending. Check console or API.</span>}
        </div>
      </form>
    </div>
  )
}
