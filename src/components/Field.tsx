import React from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

type Props = {
  label: string
  value: string | number
  component?: 'span' | 'div'
}

export const Field: React.FC<Props> = ({label, value, component = 'div'}) => {
  return (
    <Box component={component}>
      <Typography variant="button" display="inline" gutterBottom>
        {label}:
      </Typography>
      <Typography variant="button" display="inline" gutterBottom>
        {'  '}{value}
      </Typography>
    </Box>
  )
}
