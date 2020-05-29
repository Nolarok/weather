import React from 'react'

import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'

type Props = {
  isOpen: boolean
  message: string
  handleClose: (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void
}

export const CustomSnackbar: React.FC<Props> = ({isOpen, handleClose, message}) => {
  return (
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              CLOSE
            </Button>
          </React.Fragment>
        }
    />
  )
}
