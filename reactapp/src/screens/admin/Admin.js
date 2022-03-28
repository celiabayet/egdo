import React, { useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';

// Récupérer le token de l'admin
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppBar, Box, Toolbar, Typography, Container, Button, MenuItem, Modal } from '@mui/material';

import { Grid } from '@mui/material';
import AdminButton from "./AdminButtons";
import EventIcon from '@mui/icons-material/Event';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import '../../stylesheets/App.css'
import '../../stylesheets/Buttons.css'
import '../../stylesheets/Home.css'
import '../../stylesheets/Admin.css'

function Admin(props) {
    console.log(props.admin.token);

    const [logOutModal, setLogOutModal] = useState(false);

    const closeAndLogOut = () => {
        props.onDelete();
        setLogOutModal(false);
    }

    if (!props.admin.token) {
        return (<Redirect to='/' />);
    } else {
        return (
            <>
                <AppBar position="sticky">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <LinkRouter
                                    to='/'
                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                                >
                                    <img
                                        src="./images/general/egdo_logo.png"
                                        className="img-fluid"
                                        alt="Logo."
                                    />
                                </LinkRouter>
                                <Typography id="bienvenue">Bienvenue {props.admin.firstName} !</Typography>
                            </Box>

                            <Box>
                                <MenuItem key="logout">
                                    <Button color='secondary' variant='contained' onClick={() => setLogOutModal(true)}>
                                        Me déconnecter
                                    </Button>
                                </MenuItem>

                                <Modal
                                    open={logOutModal}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className="custom-modal">
                                        <h4>Souhaitez-vous vraiment vous déconnecter ?</h4>
                                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                            <button className="button-input" onClick={closeAndLogOut}>Oui</button>
                                            <button className="button-input" onClick={() => setLogOutModal(false)}>Non</button>
                                        </div>
                                    </Box>
                                </Modal>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <div id="all-admin-page">
                    <div className="admin-opacity-block">
                        <h1 className="admin-action">Que souhaitez-vous faire aujourd'hui ?</h1>
                        <Grid container style={{ display: "flex", width: "100%", height: "100%" }}>
                            <Grid item xs={12} md={4} className="home-panel">
                                <h2><LibraryBooksIcon style={{ fontSize: 50 }} /> Blog</h2>
                                <AdminButton title="Ajouter un article" />
                                {/* <AdminButton title="Modifier un article" /> */}
                                <AdminButton title="Supprimer un article" />
                            </Grid>
                            <Grid item xs={12} md={4} className="home-panel">
                                <h2><EventIcon style={{ fontSize: 50 }} /> Agenda</h2>
                                <AdminButton title="Ajouter un événement" />
                                {/* <AdminButton title="Modifier un événement" /> */}
                                <AdminButton title="Supprimer un événement" />
                            </Grid>
                            <Grid item xs={12} md={4} className="home-panel">
                                <h2><MoreHorizIcon style={{ fontSize: 50 }} /> Autre</h2>
                                <AdminButton title="Ajouter un administrateur" />
                                <AdminButton title="Contacter un développeur" />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return { admin: state.admin }
}

function mapDispatchToProps(dispatch) {
    return {
        onDelete: function () {
            dispatch({ type: 'delete' })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin); 