import React, { useRef, useState } from 'react'
import { MdInsertDriveFile } from 'react-icons/md'
import { TbFileUpload } from 'react-icons/tb'

export default function DumpCSV() {
  const inputRef = useRef()
  const [files, setFiles] = useState([])

  const handleFileSelect = (incomingFiles) => {
    const validFiles = []
    const rejectedFiles = []

    for (let file of incomingFiles) {
      if (file.name.endsWith('.csv')) validFiles.push(file)
      else rejectedFiles.push(file.name)
    }

    if (rejectedFiles.length > 0) {
      alert(`Only CSV files allowed. Rejected: ${rejectedFiles.join(', ')}`)
    }

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles])
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFileSelect(droppedFiles)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    handleFileSelect(selectedFiles)
    e.target.value = ''
  }

  const gotoDashboard = () => {
    alert(`Navigating to dashboard with ${files.length} file(s)`)
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-col w-1/2 h-[50vh] justify-center items-center rounded-3xl border-2 border-dashed border-gray-500 bg-gray-900 hover:bg-gray-800 p-8 text-center cursor-pointer transition duration-300 ease-in-out gap-4"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          multiple
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        <TbFileUpload className="text-amber-400" style={{ fontSize: '8rem' }} />
        <h2 className="text-3xl font-bold text-amber-400">
          Upload CSV (Click or Drag & Drop)
        </h2>

        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            {files.slice(0, 3).map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-2 text-gray-300"
              >
                <MdInsertDriveFile className="text-amber-400" />
                <span>{file.name}</span>
              </div>
            ))}

            {files.length > 3 && (
              <p className="text-sm text-gray-400 mt-1">
                +{files.length - 3} more
              </p>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation()
                gotoDashboard()
              }}
              className="mt-4 px-6 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-base"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
