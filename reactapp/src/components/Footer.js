import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Token à stocker dans le store une fois que l'admin s'est connecté
import { connect } from 'react-redux';

import { Grid, TextField, Modal, Box, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { Facebook } from "@mui/icons-material";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import "../stylesheets/Buttons.css"
import "../stylesheets/Footer.css"
import "../stylesheets/Modal.css"

function Footer(props) {
    // Icone EGDO sur la Map
    let EGDOIcon = L.icon({
        iconUrl: "../images/general/egdo-logo.png",
        iconAnchor: [5, 55],
        popupAnchor: [10, -44],
        iconSize: [43, 55],
    });

    // Gérer l'apparition des modaux "Nous contacter" et "Espace Admin"
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState(false);

    // Récupérer tous les champs de saisie
    const [receiver, setReceiver] = useState("");
    const [object, setObject] = useState("");
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Gérer le login de l'administrateur
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);

    const closeContactModal = () => { setContactModalOpen(false); setReceiver(""); setObject(""); setContent("") };

    const handleLogin = async () => {
        if (!props.admin.token) {
            setAdminModalOpen(true)
        } else {
            setAlreadyLoggedIn(true);
        }
    };

    const closeAdminModal = async () => {
        const adminAttempt = { email: email, password: password };
        var res = await fetch("/admin/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adminAttempt),
        });
        res = await res.json();

        if (res.result) {
            console.log(res);
            props.onPopulate(res.token, res.admin.firstName);
            setLoginSuccessful(true);
        };
        setAdminModalOpen(false); setEmail(""); setPassword("");
    };

    console.log(props.admin.token);

    if (loginSuccessful || alreadyLoggedIn) {
        return (<Redirect to='/admin' />);
    } else {
        return (
            <>
                {/* Le premier footer avec les infos et la carte */}
                <div className="footer-background">
                    <div className="footer-opacity-block">
                        <p className="footer-banner">Vous cherchez à nous joindre ?</p>
                        <Grid container className="footer-content">

                            {/* Panel de gauche du premier footer */}
                            <Grid item xs={12} md={6} className="footer-panel">
                                <div className="footer-panel-content">
                                    <div>
                                        <div className="sub-panel" style={{ paddingTop: 30, paddingBottom: 30 }}>
                                            <p style={{ fontWeight: 600 }}>Le Local (Siège social)</p>
                                            <a href={"mailto:contact@egdo.fr"} className="email"><p>contact@egdo.fr</p></a>
                                            <p>01 42 52 69 48</p>
                                            <p>25 rue de Chartres</p>
                                            <p>75018 Paris</p>
                                        </div>
                                        <div className="sub-panel" style={{ paddingTop: 40, borderTop: "2px solid white" }}>
                                            <p style={{ fontWeight: 600 }}>Le club de foot</p>
                                            <a href={"mailto:footclub@egdo.fr"} className="email"><p>footclub@egdo.fr</p></a>
                                            <p>09 53 45 13 08</p>
                                            <p>5 rue de la Charbonnière</p>
                                            <p>75018 Paris</p>
                                        </div>
                                    </div>
                                </div>
                            </Grid>

                            {/* Panel de droite du premier footer, avec la map dedans */}
                            <Grid item xs={12} md={6} className="footer-panel">
                                <div className="footer-panel-content">
                                    <MapContainer className="map-container" center={[48.887270, 2.354730]} zoom={13}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="map-tiles"
                                        />
                                        <Marker icon={EGDOIcon} position={[48.884740, 2.352990]}>
                                            <Popup>
                                                <p className="map-PopUp-title">Le Local (Siège social)</p>
                                                <p className="map-PopUp-subtitle">25 rue de Chartres</p>
                                            </Popup>
                                        </Marker>
                                        <Marker icon={EGDOIcon} position={[48.884820, 2.355250]}>
                                            <Popup>
                                                <p className="map-PopUp-title">Club de Foot</p>
                                                <p className="map-PopUp-subtitle">5 rue de la Charbonnière</p>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                {/* Le petit footer tout en bas */}
                <Grid container className="lowest-footer">

                    {/* Panel tout à gauche avec le logo et les credentials */}
                    <Grid item xs={12} md={4} className="footer-panel">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                            <div>
                                <img src="../images/general/egdo-logo.png" alt="logo de l'association" className="egdo-logo" />
                            </div>
                            <div className="EGDO-credentials">
                                <p style={{ fontWeight: 600 }}>Les Enfants de la Goutte d'or</p>
                                <p>Association loi 1901</p>
                                <p>Paris 18</p>
                                <p>FRANCE</p>
                            </div>
                        </div>
                    </Grid>

                    {/* Panel du milieu avec "Nous contacter" / "Nous suivre" */}
                    <Grid item xs={12} md={4} className="footer-panel lowest-footer-panel-middle">
                        <div className="lowest-footer-panel-content">
                            <p onClick={() => setContactModalOpen(true)} className="contact-link">NOUS CONTACTER</p>

                            {/* Modal pour "Nous contacter", qui redirige vers une boîte mail */}
                            <Modal
                                open={contactModalOpen}
                                onClose={closeContactModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="custom-modal">
                                    <h4>Remplissez le formulaire ci-dessous.</h4>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label">Qui souhaitez-vous contacter ?</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    <FormControlLabel value="contact@egdo.fr" control={<Radio />} label="Le Local (siège social)" onChange={(e) => setReceiver(e.target.value)} />
                                                    <FormControlLabel value="footclub@egdo.fr" control={<Radio />} label="Le club de foot" onChange={(e) => setReceiver(e.target.value)} />
                                                </RadioGroup>
                                            </FormControl>
                                            <div className="form-input">
                                                <TextField id="outlined-basic" label="Objet du message" variant="outlined" className="input-field" onChange={(e) => setObject(e.target.value)} value={object} />
                                                <TextField id="outlined-basic" label="Contenu" variant="outlined" multiline rows={9} className="input-field" onChange={(e) => setContent(e.target.value)} value={content} />
                                            </div>
                                        </div>
                                        <a href={`mailto:${receiver}?bcc=romain.defouilhoux@pm.me&subject=${object}&body=${content}`}><button className="button-input" onClick={closeContactModal}>Envoyer depuis mon adresse email</button></a>
                                    </div>
                                </Box>
                            </Modal>

                            {/* Partie "Nous suivre" */}
                            <p style={{ fontWeight: 300, textAlign: "center" }}>ou</p>
                            <p style={{ fontWeight: 500, textAlign: "center" }}>NOUS SUIVRE</p>

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <a href="https://www.facebook.com/egdo75" target="_blank" rel="noreferrer" style={{ marginLeft: 5, marginRight: 5 }}><Facebook /></a>
                                <a href="https://vimeo.com/egdo" target="_blank" rel="noreferrer" style={{ marginLeft: 5, marginRight: 5 }}><img src="../images/general/vimeo-logo.png" alt="logo de Vimeo" style={{ width: 50 }} /></a>
                            </div>

                        </div>
                    </Grid>

                    {/* Dernier panel du footer avec divers liens utiles (pas encore actifs) */}
                    <Grid item xs={12} md={4} className="footer-panel">
                        <div className="lowest-footer-panel-content">
                            <p>PRESSE</p>
                            <p>NEWSLETTER</p>
                            <p><a href="https://egdo.fr/images/EGDO/2020-egdo-rapport-activite.pdf" target="_blank">RAPPORT D'ACTIVITES</a></p>
                            <p>MENTIONS LEGALES</p>
                            <p onClick={() => handleLogin()} className="contact-link">ESPACE ADMIN</p>

                            {/* Modal pour se connecter, qui redirige vers la page Admin */}
                            <Modal
                                open={adminModalOpen}
                                onClose={closeAdminModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="custom-modal">
                                    <h4>Veuillez vous connecter pour continuer.</h4>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
                                        <div className="form-input">
                                            <TextField id="outlined-basic" label="Votre email" variant="outlined" className="input-field" onChange={(e) => setEmail(e.target.value)} value={email} />
                                            <TextField id="outlined-basic" label="Votre mot de passe" variant="outlined" className="input-field" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                        </div>
                                        <button className="button-input" onClick={closeAdminModal}>Accéder à l'espace admin</button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}

function mapStateToProps(state) {
    return { admin: state.admin }
}

function mapDispatchToProps(dispatch) {
    return {
        onPopulate: function (token, firstName) {
            dispatch({ type: 'populate', token, firstName })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);