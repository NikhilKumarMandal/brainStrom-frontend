import React, { act } from 'react'
import formatDate from '../utils/formatePostTime'
import formateString from '../utils/formateString'
import { useAuthStore } from '../store/store';

export default function AuditLogCard({
  auditLogs, className = '', isLoading,
  members, fromProfile = false, fromTeam = false,
  leaderId
}) {
  console.log('auditLogs', auditLogs);
  const {user} = useAuthStore()
  const localUserId = user.id

  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg px-4 overflow-y-auto shadow-inner ${className}`}>

      <h2 className="text-lg font-semibold pt-2 text-amber-400">Audit Logs:</h2>
      <div className="-mx-4 w-[calc(100%+2rem)] border-b border-gray-700 my-4" />

      {isLoading &&
        <div className="flex items-center justify-center gap-2 text-xl text-white m-auto h-[80%]">
          <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
      {auditLogs && auditLogs.length > 0 ? (
        <ul className="text-sm text-gray-300 space-y-3">
          {auditLogs.map((log, index) => (
            <li key={index} className="border-b border-gray-700 pb-2">
              <p><span className="font-semibold text-amber-100">Action: </span>
                {handleAction(log.action, log.userId, members, leaderId, localUserId)}
              </p>
              {log.reason && (
                <p><span className="font-semibold text-amber-300">Reason: </span>{log.reason}</p>
              )}
              {(log.teamName) && (
                <p><span className="font-semibold text-amber-500">Team Name:  </span>{log.teamName}</p>
              )}
              {log.createdAt && (
                <p className="text-xs text-gray-500 mt-1">{formatDate(log.createdAt)}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No audit logs yet.</p>
      )}
    </div>
  )
}



function getUsernameById(members, userId, localUserId, leaderId) {
  if (userId === leaderId) {
    return 'Leader';
  } else if (userId === localUserId) {
    return 'You'
  }
  const member = members.find(m => m.userId === userId);
  return member?.user?.name ?? 'Unknown User';
}

function handleAction(action, userId, members, leaderId, localUserId) {

  const username = getUsernameById(members, userId, localUserId, leaderId);

  switch (action) {
    case 'REQUEST':
      return `${username} requested to join the team`;
    case 'ACCEPTED_JOIN_REQUEST':
      return username === 'Leader' ? 'Leader a accepted the join request' : `${username} joined the team`;
    case 'LEAVE':
      return 'Left the team';
    case 'KICKED_MEMBER':
      return 'A member kicked from the team';
    default:
      return formateString(action);
  }
}
