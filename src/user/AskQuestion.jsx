import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createTicket } from '../http/api'
import { Box, Typography, TextField, Button, Paper, IconButton } from '@mui/material'
import { AddPhotoAlternate, DeleteRounded } from '@mui/icons-material'
import { argbToHex, mdcolors } from '../utils/colors'
import { textFieldStyle } from './styles'
import CourseSelector from './utils/CourseSelector'
import useNavigation from '../utils/navigation'
import RichTextEditor from './components/RichTextEditor'

export default function AskQuestion() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [course, setCourse] = useState('')
  const [images, setImages] = useState([])

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
    if (!description.trim()) return alert('Description is required')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('courses', course)
    images.forEach((img) => formData.append('images', img))

    console.log('Submitting Ticket:')
    console.log({
      title,
      description,
      course,
      images: images.map((f) => f.name)
    })

    mutate(formData)
  }

  return (
    <Paper sx={{
      m: 4, p: 4, borderRadius: '2rem', display: 'flex', width: '70%', gap: 4,
      flexDirection: { xs: 'column', md: 'row' }, backgroundColor: argbToHex(mdcolors.surface),
      boxShadow: `0px 16px 16px ${argbToHex(mdcolors.shadow)}`
    }}>
      <form onSubmit={handleSubmit} style={{
        flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'space-evenly'
      }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: argbToHex(mdcolors.primary) }}>
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
          <input type="file" accept="image/*" hidden multiple id="img-upload" onChange={handleImageUpload} />
          <label htmlFor="img-upload">
            <IconButton component="span" sx={{
              display: 'flex', flexDirection: 'column', border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
              borderRadius: '1rem', p: 2, height: 88, width: 88, gap: 1
            }}>
              <AddPhotoAlternate sx={{ fontSize: '1.5rem', color: argbToHex(mdcolors.primary) }} />
              <Typography variant="caption" sx={{ color: argbToHex(mdcolors.primary) }}>Upload Image</Typography>
            </IconButton>
          </label>

          {images.slice(0, 3).map((img, idx) => (
            <Box key={idx} sx={{
              width: 88, height: 88, position: 'relative', border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
              borderRadius: '0.75rem', overflow: 'hidden', display: 'flex', alignItems: 'center',
              justifyContent: 'center', backgroundColor: argbToHex(mdcolors.surfaceVariant)
            }}>
              <IconButton
                size="small"
                onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                sx={{
                  position: 'absolute', top: 2, right: 2,
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

              <img src={URL.createObjectURL(img)} alt={`preview-${idx}`} style={{
                width: '100%', height: '100%', objectFit: 'cover'
              }} />
            </Box>
          ))}

          {images.length > 3 && (
            <Box sx={{
              width: 88, height: 88, border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
              borderRadius: '0.75rem', display: 'flex', alignItems: 'center',
              justifyContent: 'center', backgroundColor: argbToHex(mdcolors.surfaceVariant)
            }}>
              <Typography variant="h5" sx={{ color: argbToHex(mdcolors.onSurfaceVariant) }}>
                +{images.length - 3}
              </Typography>
            </Box>
          )}
        </Box>

        <Button type="submit" variant="contained" fullWidth disabled={isPending}
          sx={{ borderRadius: '1rem', textTransform: 'none', fontSize: 'large' }}>
          Submit
        </Button>
      </form>

      <Box flex={1} sx={{
        border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
        borderRadius: '1rem', p: 2, height: '95%', display: 'flex', flexDirection: 'column'
      }}>
        <Typography variant="h6" sx={{
          mb: 1, color: argbToHex(mdcolors.secondary), fontWeight: 'bold'
        }}>
          Description *
        </Typography>

        <RichTextEditor content={description} onChange={setDescription} />

      </Box>
    </Paper>
  )
}
