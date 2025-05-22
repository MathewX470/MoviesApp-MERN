import { Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@emotion/react'

const Logo = () => {
    const theme=useTheme()

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
Skibidi<span style={{color:theme.palette.primary.main}}>Flix</span>
    </Typography>
  )
}

export default Logo