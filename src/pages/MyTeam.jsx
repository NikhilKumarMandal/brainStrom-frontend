import React, { useState } from 'react';
import RichTextEditor from '../components/RichTextEditor';
import { mockMyTeam } from '../utils/mockData';

const MyTeam = () => {
  const role = 'leader';
  const [openModal, setOpenModal] = useState(null); // 'notice' | 'edit' | 'members'

  const team = mockMyTeam;

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 flex flex-col gap-6 items-center justify-center text-center">
      <h1 className="text-3xl font-bold">{team.name}</h1>
      <p className="text-gray-400">{team.description}</p>

      <div className="flex flex-wrap gap-2 justify-center">
        {team.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div>
        <button
          onClick={() => setOpenModal('members')}
          className="px-4 py-2 rounded-md border text-sm transition border-blue-700 text-white hover:bg-blue-700 hover:border-blue-500"
        >
          View Members
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-2">Noticeboard</h2>
        <p className="text-gray-300 mb-4">{team.notice}</p>
        {role === 'leader' && (
          <div className="flex justify-end">
            <button
              onClick={() => setOpenModal('edit')}
              className="px-4 py-2 rounded-full border text-sm transition border-green-700 text-white hover:bg-green-700 hover:border-green-500"
            >
              Edit Noticeboard
            </button>
          </div>
        )}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 px-6 pt-4 pb-12 rounded-lg shadow-lg w-full max-w-md h-3/4 relative">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {openModal === 'edit' && (
              <>
                <h3 className="text-xl font-bold">Edit Notice</h3>
                <div className="mt-6 h-[85%]">
                  <RichTextEditor
                    content={team.notice}
                    onUpdate={({ editor }) => {
                      team.notice = editor.getHTML();
                    }}
                    height="100%"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setOpenModal(null)}
                    className="px-5 py-1 mt-3 rounded-full bg-green-700 hover:bg-green-600 text-sm"
                  >
                    Save
                  </button>
                </div>
              </>
            )}

            {openModal === 'members' && (
              <>
                <h3 className="text-xl font-bold mb-4">Team Members</h3>
                <ul className="text-gray-300 space-y-3">
                  {team.members.map((m, i) => (
                    <li key={i} className="bg-gray-700 p-3 rounded-md">
                      <div className="font-semibold">
                        {m.name}{' '}
                        {m.isLeader && (
                          <span className="text-xs text-yellow-400">Leader</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        Skills: {m.skills.join(', ')}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTeam;
