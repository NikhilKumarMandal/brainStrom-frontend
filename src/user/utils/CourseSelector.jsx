import { useState, useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { textFieldStyle } from '../styles'
import { argbToHex, mdcolors } from '../../utils/colors'
import { mockCourses } from './mockData'

export default function CourseSelector({ course, setCourse }) {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses)
      if (mockCourses.length === 1) setCourse(mockCourses[0])
    }, 500)
  }, [])

  if (courses.length === 1) {
    return (
      <TextField
        label="Course"
        value={courses[0]}
        fullWidth
        disabled
        sx={textFieldStyle}
      />
    )
  }

  return (
    <Autocomplete
      options={courses}
      value={course}
      onChange={(e, val) => setCourse(val || '')}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose Course"
          required
          sx={textFieldStyle}
        />
      )}
      sx={{
        '& .MuiAutocomplete-popupIndicator': {
          color: argbToHex(mdcolors.primary),
        },
        '& .MuiAutocomplete-paper': {
          backgroundColor: argbToHex(mdcolors.surface),
        },
        '& .MuiAutocomplete-option': {
          backgroundColor: argbToHex(mdcolors.background), // Changed to background color
          color: argbToHex(mdcolors.onSurface),
          '&[aria-selected="true"]': {
            backgroundColor: argbToHex(mdcolors.secondaryContainer),
            color: argbToHex(mdcolors.onSecondaryContainer),
          },
          '&:hover': {
            backgroundColor: argbToHex(mdcolors.surfaceVariant),
          },
        },
      }}
    />
  )
}