import { Box, Typography, TextField, MenuItem, Button, Paper, IconButton } from '@mui/material'
import { useState } from 'react'
import { argbToHex, mdcolors } from '../utils/colors'
import { AddPhotoAlternate, DeleteRounded, Image } from '@mui/icons-material'
import { textFieldStyle } from './styles'
import CourseSelector from './utils/CourseSelector'

export default function AskQuestion() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [course, setCourse] = useState('')
  const [images, setImages] = useState([])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setImages((prev) => [...prev, ...files])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      title,
      description,
      course,
      images
    }
    console.log('Form submitted:', formData)
    alert('Submitted')
  }

  return (
    <Paper
      sx={{
        m: 4,
        p: 4,
        borderRadius: '2rem',
        display: 'flex',
        width: '70%',
        gap: 4,
        flexDirection: { xs: 'column', md: 'row' },
        backgroundColor: argbToHex(mdcolors.surface),
        boxShadow: `0px 16px 16px ${argbToHex(mdcolors.shadow)}`,
      }}
    >
      {/* Left Panel */}
      <form
        onSubmit={handleSubmit}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          justifyContent: 'space-evenly'
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ color: argbToHex(mdcolors.primary) }}
        >
          Ask a Question
        </Typography>

        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          sx={textFieldStyle}
        />

        <CourseSelector course={course} setCourse={setCourse} />

        <Box display="flex" gap={2} flexWrap="wrap">
          <input
            type="file"
            accept="image/*"
            hidden
            multiple
            id="img-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="img-upload">
            <IconButton
              component="span"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
                borderRadius: '1rem',
                p: 2,
                height: 88,
                width: 88,
                gap: 1
              }}
            >
              <AddPhotoAlternate sx={{ fontSize: '1.5rem', color: argbToHex(mdcolors.primary) }} />
              <Typography variant="caption" sx={{ color: argbToHex(mdcolors.primary) }}>Upload Image</Typography>
            </IconButton>
          </label>

          {images.slice(0, 3).map((img, idx) => (
            <Box
              key={idx}
              sx={{
                width: 88,
                height: 88,
                position: 'relative',
                border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
                borderRadius: '0.75rem',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: argbToHex(mdcolors.surfaceVariant)
              }}
            >
              {/* Delete Button */}
              <IconButton
                size="small"
                onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                sx={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  backgroundColor: argbToHex(mdcolors.errorContainer),
                  zIndex: 1,
                  '&:hover': {
                    backgroundColor: argbToHex(mdcolors.errorContainer),
                    transform: 'scale(1.3)'
                  }
                }}
              >
                <DeleteRounded sx={{ fontSize: '1rem', color: argbToHex(mdcolors.error) }} />
              </IconButton>

              <img
                src={URL.createObjectURL(img)}
                alt={`preview-${idx}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          ))}

          {images.length > 3 && (
            <Box
              sx={{
                width: 88,
                height: 88,
                border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: argbToHex(mdcolors.surfaceVariant)
              }}
            >
              <Typography variant="h5" sx={{ color: argbToHex(mdcolors.onSurfaceVariant) }}>
                +{images.length - 3}
              </Typography>
            </Box>
          )}

        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ borderRadius: '1rem', textTransform: 'none', fontSize: 'large' }}
        >
          Submit
        </Button>
      </form>

      {/* Right Panel */}
      <Box
        flex={1}
        sx={{
          border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
          borderRadius: '1rem',
          p: 2,
          height: '95%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            color: argbToHex(mdcolors.secondary),
            fontWeight: 'bold'
          }}
        >
          Description *
        </Typography>

        <TextField
          multiline
          fullWidth
          placeholder="Type your question details here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            ...textFieldStyle,
            flex: 1,
            overflow: 'auto',
            '& .MuiOutlinedInput-root': {
              ...textFieldStyle['& .MuiOutlinedInput-root'],
              height: '100%',
              alignItems: 'flex-start',
              '& textarea': {
                overflow: 'auto',
                height: '100%'
              }
            }
          }}
        />

      </Box>
    </Paper>
  )
}
