import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
import TransitionAlerts from './Alert'

const style = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding:'2rem',
    borderRadius:'50px'
  },
  button: {
    background: "primary",
    borderRadius: 10,
    boxShadow: "3px 3px 0 0 rgb(0,0,0)"
  }
};

export default function ModalEvent({ eventTitle, eventDate }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // fetch BDD
  const [errorMsg, setErrorMsg] = useState([])
  const [successMsg, setSuccessMsg] = useState([])


  const closeModalHandler = () => {
    setOpen(false)
  }


  // Event Form
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')

  // Submit Form
  const submitForm = async () => {
    const addParticipant = await fetch('event/add-participant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `eventTitle=${eventTitle}&name=${name}&surname=${surname}&email=${email}&telephone=${telephone}`
    });
    const res = await addParticipant.json()

    if (res.error.length !== 0) {
      setErrorMsg(res.error)
      setSuccessMsg('')
    }

    else if (res.result) {
      setErrorMsg('')
      setSuccessMsg(["Votre inscription a été validée !"])
      setName('')
      setSurname('')
      setEmail('')
      setTelephone('')
    }
  }

  return (
    <div>

      <Button variant="contained" style={style.button} onClick={handleOpen}>Participer</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style.modalBox}>
          <FontAwesomeIcon sx={{ color: 'primary' }} icon={faRectangleXmark} size='lg' style={{ position: 'absolute', right: '3rem', top: '2rem', cursor: 'pointer' }}
            onClick={() => { closeModalHandler() }} />

          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <h6>Participer à la sortie</h6>
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 1 }}>
            <h6>{eventTitle}</h6>
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 1 }}>
            <h6> Le {eventDate}</h6>
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <TextField id="outlined-basic" label="Nom" variant="outlined" value={name}
              onChange={(e) => {
                setName(e.target.value)
                setSuccessMsg(''); setErrorMsg('')
              }} />
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <TextField id="outlined-basic" label="Prénom" variant="outlined" value={surname}
              onChange={(e) => {
                setSurname(e.target.value)
                setSuccessMsg(''); setErrorMsg('')
              }} />
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setSuccessMsg(''); setErrorMsg('')
              }} />
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <TextField id="outlined-basic" label="Téléphone" variant="outlined" value={telephone}
              onChange={(e) => {
                setTelephone(e.target.value)
                setSuccessMsg(''); setErrorMsg('')
              }} />
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 1 }}>
            {errorMsg.length !== 0 && <TransitionAlerts type='error' msg={errorMsg[0]} />}
            {successMsg.length !== 0 && <TransitionAlerts type='success' msg={successMsg[0]} />}
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => submitForm()}>Valider</Button>
          </Typography>
        </Box>
      </Modal>
    </div >
  );
}