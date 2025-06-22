import React from 'react'

export default function AuditLogCard({ auditLogs }) {
  function formatDate(dateString) {
    const date = new Date(dateString)
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()
    return `${time}, ${day}-${month}-${year}`
  }

  return (
    <div className="mt-8 absolute right-6 bottom-6 w-1/3 h-[34%]">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 max-h-52 w-full h-full overflow-y-auto shadow-inner">
        <h2 className="text-lg font-semibold mb-2">Audit Logs:</h2>
        {auditLogs && auditLogs.length > 0 ? (
          <ul className="text-sm text-gray-400 space-y-2">
            {auditLogs.map((log, index) => (
              <li key={index} className="border-b border-gray-700 pb-1">
                <span className="text-gray-300">{log.message}</span>
                <span className="text-xs block text-gray-500">
                  {formatDate(log.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No audit logs yet.</p>
        )}
      </div>
    </div>
  )
}
