import React, {useEffect, useState} from 'react'

const fallback = [
  {id:1, title:'Planning sync', when:'2025-11-07 14:00', status:'Confirmed'},
  {id:2, title:'Design review', when:'2025-11-09 10:00', status:'Pending'},
  {id:3, title:'All-hands prep', when:'2025-11-12 09:00', status:'Approved'},
]

export default function Dashboard(){
  const [rows, setRows] = useState([])

  useEffect(()=>{
    let cancelled = false
    fetch('/api/logs').then(r=>r.ok? r.json() : Promise.reject()).then(data=>{
      if(!cancelled) setRows(data)
    }).catch(()=>{
      if(!cancelled) setRows(fallback)
    })
    return ()=> cancelled = true
  },[])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recent meetings</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="p-3">Title</th>
              <th className="p-3">When</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=> (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.title}</td>
                <td className="p-3">{r.when}</td>
                <td className="p-3">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
