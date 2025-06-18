import { ArrowForwardIosRounded, ExpandMore, ChevronRight, } from '@mui/icons-material'
import { Box, Button, Menu, MenuItem, Typography, } from '@mui/material'
import React, { useState } from 'react'
import { argbToHex, mdcolors } from '../../utils/colors'
import { mockCourses } from '../utils/mockData'

export default function FilterOptions({ courses = mockCourses }) {
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
