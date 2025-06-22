import React from 'react'
import formatDate from '../utils/formatePostTime'

export default function AuditLogCard({ auditLogs, className = '' }) {
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4 overflow-y-auto shadow-inner ${className}`}>
      <h2 className="text-lg font-semibold mb-2 text-amber-400">Audit Logs:</h2>
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
  )
}
