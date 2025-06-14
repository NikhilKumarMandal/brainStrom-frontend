import React, { useRef, useState } from 'react'
import { argbToHex, mdcolors } from '../utils/colors'
import { UploadFileRounded, InsertDriveFile } from '@mui/icons-material'
import { Typography, Button, Box, lighten } from '@mui/material'

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
    <Box
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        minHeight: '50vh',
        borderRadius: '2rem',
        border: `2px dashed ${argbToHex(mdcolors.outlineVariant)}`,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        padding: '2rem',
        cursor: 'pointer',
        textAlign: 'center',
        backgroundColor: lighten(argbToHex(mdcolors.surface), 0.1),
        transition: '0.3s ease',
        gap: '1rem',
        '&:hover': {
          backgroundColor: argbToHex(mdcolors.surface),
        },
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        multiple
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      <UploadFileRounded style={{ fontSize: '8rem', color: argbToHex(mdcolors.primary) }} />
      <Typography variant="h4" fontWeight="bold" style={{ color: argbToHex(mdcolors.primary) }}>
        Upload CSV (Click or Drag & Drop)
      </Typography>

      {files.length > 0 && (
        <Box mt={4}>
          {files.slice(0, 3).map((file, idx) => (
            <Box
              key={idx}
              display="flex"
              alignItems="center"
              gap={1}
              justifyContent="center"
              mb={1}
            >
              <InsertDriveFile htmlColor={argbToHex(mdcolors.primary)} />
              <Typography variant="body1">{file.name}</Typography>
            </Box>
          ))}

          {files.length > 3 && (
            <Typography variant="body2" mt={1}>
              +{files.length - 3} more
            </Typography>
          )}

          <Button
            variant="contained"
            backgroundColor={argbToHex(mdcolors.primary)}
            sx={{ mt: 2, fontSize: '1rem', borderRadius: '2rem', padding: '0.5rem 1.5rem' }}
            onClick={(e) => {
              e.stopPropagation()
              gotoDashboard()
            }}
          >
            Done
          </Button>
        </Box>
      )}
    </Box>
  )
}
