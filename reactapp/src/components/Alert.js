import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts({type, msg}) {
  const [open, setOpen] = useState(true);
const msgType= type=='error'? 'error': 'success'
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
        severity= {msgType}
          action={
            <IconButton
              aria-label="close"
              
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {msg}
        </Alert>
      </Collapse>

    </Box>
  );
}