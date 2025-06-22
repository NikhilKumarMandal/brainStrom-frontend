import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { createTeam } from '../http/api'
import CourseSelector from '../components/CourseSelector'

export default function CreateTeam() {
  const [teamName, setTeamName] = useState('')
  const [description, setDescription] = useState('')
  const [newSkill, setNewSkill] = useState('')
  const [skills, setSkills] = useState([])
  const [course, setCourse] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [openLimitModal, setOpenLimitModal] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: async (teamData) => {
      const { data } = await createTeam(teamData) // ensure this sends JSON
      return data
    },
    onSuccess: () => {
      alert('Team created!')
      setTeamName('')
      setDescription('')
      setSkills([])
      setNewSkill('')
      setCourse('')
    },
    onError: () => {
      alert('Failed to create team')
    },
  })

  const addSkill = () => {
    const trimmed = newSkill.trim()
    if (!trimmed || skills.includes(trimmed)) return

    if (skills.length >= 10) {
      setOpenLimitModal(true)
      return
    }

    setSkills([...skills, trimmed])
    setNewSkill('')
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleCreate = (e) => {
    e.preventDefault()
    setShowErrors(true)

    if (!teamName || !description || !course) {
      alert('Team name, description, and course are required.')
      return
    }

    const teamData = {
      name: teamName,
      description,
      course,
      skills,
    }

    console.log('Submitting:', teamData)
    mutate(teamData)
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-3xl font-bold">Create a New Team</h1>

      <div className="w-full max-w-lg flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
          className="px-4 py-2 bg-gray-700 rounded text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-600 hover:border-amber-600"
        />

        <CourseSelector course={course} setCourse={setCourse} showError={showErrors} showHint={false} />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Team Description"
          rows={4}
          className="px-4 py-2 bg-gray-700 rounded text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-600 hover:border-amber-600"
        />

        {/* Technology input */}
        <div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              placeholder="Add a technology and press Enter"
              className="flex-1 px-4 py-2 bg-gray-700 rounded text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-600 hover:border-amber-600"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 rounded-md border text-sm transition border-amber-700 text-white hover:bg-amber-800 focus:outline-none hover:border-amber-700"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs bg-gray-700 text-gray-300 pl-3 py-1 rounded flex items-center justify-between gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-red-400 text-lg p-1 bg-transparent focus:outline-none border-none hover:scale-110"
                >
                  <IoIosCloseCircleOutline className="text-xl" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={isPending}
          className="mt-4 px-4 py-2 rounded-md border text-sm transition border-amber-700 text-white hover:bg-amber-800 hover:border-amber-500 focus:outline-none disabled:opacity-50"
        >
          {isPending ? 'Creating...' : 'Create Team'}
        </button>
      </div>

      {/* Modal for skill limit */}
      {openLimitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm relative text-center">
            <h2 className="text-lg font-semibold mb-2">Skill Limit Reached</h2>
            <p className="text-gray-300 mb-4">
              Maximum limit of adding skills is reached.<br />You can only add 10 skills.
            </p>
            <button
              onClick={() => setOpenLimitModal(false)}
              className="mt-2 px-4 py-2 rounded-md bg-amber-700 hover:bg-amber-600 text-white text-sm"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
