import React from 'react';
import { Grid, Button, Container, Typography } from '@mui/material';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// import './Discover.css'
import '../../stylesheets/App.css'

const nav = ["Contact"];

export default function Act() {
    return (
        <>
            <Navbar nav={nav} />

            <div className='section'>
                <div className='opacity'>
                    <Container
                        maxWidth='70%'
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'space-between', p: '50px' }}>
                        <Grid
                            container
                            sx={{ minHeight: '50vh' }}
                            spacing={8}
                            justifyContent='center'
                        >
                            <Grid item md={5} sx={{ display: "flex", flexDirection: "column", justifyContent: " space-between", alignItems: "center" }}>
                                <img src="../images/act/image-act-2.jpg" alt="pourquoi donner" className='img-fluid act-img' />
                                <div>
                                    <Typography variant="body1" style={{ fontWeight: "700", margin: "1rem 0" }}>
                                        Pourquoi donner ?
                                    </Typography>
                                    <Typography style={{ fontSize: 23, lineHeight: 1.2, marginBottom: "1rem" }}>
                                        Nous accompagnons chaque année des dizaines d'enfants, jeunes et adultes de notre quartier dans leur parcours de vie. Sans don, rien de cela ne serait possible. <a href="https://www.payassociation.fr/egdo/dons" target="_blank">Contribuez à notre action !</a>
                                    </Typography>
                                </div>
                            </Grid>

                            <Grid item md={5} sx={{ display: "flex", flexDirection: "column-reverse", justifyContent: " space-between", alignItems: "center" }} className="act-panel-right">
                                <img src="../images/act/image-act-1.jpg" alt="pourquoi devenir bénévole" className='img-fluid act-img' />
                                <div>
                                    <Typography variant="body1" style={{ fontWeight: "700", marginBottom: "1rem" }}>
                                        Pourquoi devenir bénévole ?
                                    </Typography>
                                    <Typography style={{ fontSize: 23, lineHeight: 1.2, margin: "1.5rem 0" }}>
                                        Près de 160 bénévoles, de 10 à 80 ans, ont déjà prêté main forte à l'association pour faire briller la Goutte d'Or et ses talents dans leur diversité. Rejoignez-les. <a href="mailto:contactbenevolat@egdo.fr?subject=Je souhaite devenir bénévole">Rejoignez-nous !</a>
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>

                    </Container>
                </div>
            </div>
            <div id={nav[0]}>
                <Footer />
            </div>

        </>
    )
}
