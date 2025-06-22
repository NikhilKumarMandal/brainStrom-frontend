import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createTicket } from '../http/api'
import CourseSelector from '../components/CourseSelector'
import useNavigation from '../utils/navigation'
import RichTextEditor from '../components/RichTextEditor'
import { TbPhotoPlus } from 'react-icons/tb'
import { TiDelete } from 'react-icons/ti'

export default function AskQuestion() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [course, setCourse] = useState('')
  const [images, setImages] = useState([])
  const [showErrors, setShowErrors] = useState(false)

  const { gotoHomePage } = useNavigation()

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setImages((prev) => [...prev, ...files])
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await createTicket(formData)
      return data
    },
    onSuccess: () => {
      alert('Submitted')
      gotoHomePage()
    },
    onError: () => {
      alert('Failed to submit ticket')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowErrors(true)

    if (!description.trim()) {
      alert('Description is required')
      return
    }

    if (!course) {
      alert('Course selection is required')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('courses', course)
    images.forEach((img) => formData.append('images', img))

    mutate(formData)
  }

  return (
    <div className="w-screen h-screen p-6 bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full h-full p-6 flex flex-col md:flex-row gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-amber-500">Ask a Question</h1>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="bg-gray-900 border rounded-lg border-gray-600 p-3 w-full focus:outline-none focus:ring-1 focus:ring-amber-600 hover:border-amber-600"
          />

          <CourseSelector course={course} setCourse={setCourse} showError={showErrors} />

          <div className="flex flex-wrap gap-2">
            <input type="file" accept="image/*" hidden multiple id="img-upload" onChange={handleImageUpload} />
            <label htmlFor="img-upload">
              <div className="flex flex-col items-center justify-center border rounded-lg border-gray-600 w-20 h-20 p-2 cursor-pointer hover:scale-105 hover:border-amber-600 transition">
                <TbPhotoPlus className="text-amber-500 rounded-lg text-2xl mb-2" />
                <span className="text-xs text-amber-500">Upload</span>
              </div>
            </label>

            {images.slice(0, 3).map((img, idx) => (
              <div key={idx} className="relative w-20 h-20 border rounded-lg border-gray-600 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                  className="absolute top-0 right-0 bg-transparent rounded-full p-0 hover:bg-gray-600"
                >
                  <TiDelete className="text-lg" />
                </button>

                <img src={URL.createObjectURL(img)} alt={`preview-${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}

            {images.length > 3 && (
              <div className="w-20 h-20 border rounded-lg border-gray-600 flex items-center justify-center bg-gray-700">
                <span className="text-white font-semibold">+{images.length - 3}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-amber-600 hover:bg-amber-500 text-black font-semibold py-2 rounded-[1rem] text-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Submit
          </button>
        </form>

        <div className="w-full md:w-1/2 border rounded-lg border-gray-700 p-4">
          <h2 className="text-lg font-semibold text-gray-300 mb-2">Description *</h2>
          <RichTextEditor content={description} onChange={setDescription} />
        </div>
      </div>
    </div>
  )
}
