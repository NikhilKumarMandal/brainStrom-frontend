import {
  ArrowForwardIosRounded,
  Check,
  ExpandMore,
  ChevronRight,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  lighten,
} from '@mui/material'
import React, { useState } from 'react'
import { argbToHex, mdcolors } from '../../utils/colors'
import { mockCourses } from '../utils/mockData'

export default function FilterOptions({
  selected,
  setSelected,
  options,
  handleChange,
  courses = mockCourses,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null)
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSubmenuAnchorEl(null)
    setActiveSubmenu(null)
  }

  const handleParentClick = (type) => (event) => {
    setActiveSubmenu(type)
    setSubmenuAnchorEl(event.currentTarget)
  }

  const handleSortOptionClick = (type, value) => {
    alert(`${type}: ${value}`)
    handleClose()
  }

  return (
    <Box
      sx={{
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
      }}
    >
      <Typography
        variant='h5'
        fontWeight='bold'
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        Questions <ArrowForwardIosRounded fontSize='small' />
      </Typography>

      <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={handleChange}
        sx={{
          display: 'flex',
          width: '70%',
          margin: '1rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {options.map(({ label, value }, index) => (
          <ToggleButton
            key={value}
            value={value}
            sx={{
              display: 'flex',
              width: '15%',
              py: 1,
              color: argbToHex(mdcolors.onPrimaryContainer),
              borderColor: argbToHex(mdcolors.inversePrimary),
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&.Mui-selected': {
                backgroundColor: lighten(argbToHex(mdcolors.primary), 0.1),
                color: argbToHex(mdcolors.onPrimary),
                transform: 'scale(1.05)',
              },
              '&:hover': {
                backgroundColor: 'transparent',
              },
              '&.Mui-selected:hover': {
                backgroundColor: lighten(argbToHex(mdcolors.primary), 0.1),
              },
              ...(index === 0 && {
                borderTopLeftRadius: '2rem',
                borderBottomLeftRadius: '2rem',
              }),
              ...(index === options.length - 1 && {
                borderTopRightRadius: '2rem',
                borderBottomRightRadius: '2rem',
              }),
            }}
          >
            {selected === value && <Check fontSize='small' sx={{ mr: 0.5 }} />}
            <Typography variant='body2'>{label}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Button
        variant='outlined'
        onClick={handleSortClick}
        endIcon={<ExpandMore />}
        sx={{
          borderRadius: '2rem',
          textTransform: 'none',
          color: argbToHex(mdcolors.primary),
          borderColor: argbToHex(mdcolors.primary),
        }}
      >
        Sort By
      </Button>

      {/* Main Sort Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleParentClick('Hardness')}>
          Hardness <ChevronRight fontSize='small' />
        </MenuItem>
        <MenuItem onClick={handleParentClick('Courses')}>
          Courses <ChevronRight fontSize='small' />
        </MenuItem>
      </Menu>

      {/* Submenu */}
      <Menu
        anchorEl={submenuAnchorEl}
        open={Boolean(submenuAnchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {activeSubmenu === 'Hardness' &&
          ['Easy', 'Medium', 'Hard'].map((level) => (
            <MenuItem key={level} onClick={() => handleSortOptionClick('Hardness', level)}>
              {level}
            </MenuItem>
          ))}
        {activeSubmenu === 'Courses' &&
          courses.map((course) => (
            <MenuItem key={course} onClick={() => handleSortOptionClick('Course', course)}>
              {course}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  )
}
