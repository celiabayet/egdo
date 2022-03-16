import React, { useEffect } from 'react';
import { Grid, Button, Box, Container, Typography, Link } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';

import '../../stylesheets/App.css'
import '../../stylesheets/Buttons.css'

import AOS from "aos"
import "aos/dist/aos.css"

export default function Home() {

    useEffect(() => {

        const aosAnime = () => {
            AOS.init(
                { duration: 1000 }
            );
            AOS.refresh();
        }

        aosAnime()
    }, [])
    return (
        <div className='home' style={mystyle.img}>
            <Box className='home' style={mystyle.opacity} sx={{ display: { md: 'flex', xs: 'none' } }}>

                <Container maxWidth='lg' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Grid container
                        xs={12}
                        md={6}
                        mx={3}
                        // my={0}
                        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%' }}
                        spacing={4}>
                        <Grid item sx={{ width: '100%' }}>
                            <Typography variant='h2' sx={{ color: '#FFF' }}>
                                EGDO
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h4' sx={{ color: '#FFF' }}>
                                L'association des Enfants de la Goutte d'or accompagne dans la durée les enfants, les jeunes mais aussi les adultes afin qu’ils prennnent leur place de citoyens.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} spacing={8}>
                        <Grid item data-aos="fade-left" data-aos-duration="1000">
                            <LinkRouter
                                to='/espace-eleve'
                                variant="body2"
                                underline='none'
                                style={{ textDecoration: 'none' }}
                            >
                                <Button size='large' variant='contained' color='primary' sx={{ minWidth: '200px' }}> Espace Elève</Button>
                            </LinkRouter>
                        </Grid>
                        <Grid item data-aos="fade-left" data-aos-duration="2000">
                            <LinkRouter
                                to='/espace-insertion'
                                variant="body2"
                                underline='none'
                                style={{ textDecoration: 'none' }}
                            >
                                <Button size='large' variant='contained' color='primary' sx={{ minWidth: '200px' }}> Espace Insertion</Button>
                            </LinkRouter>
                        </Grid>
                        <Grid item data-aos="fade-left" data-aos-duration="3000">
                            <LinkRouter
                                to='/espace-benevole'
                                variant="body2"
                                underline='none'
                                style={{ textDecoration: 'none' }}
                            >
                                <Button size='large' variant='contained' color='primary' sx={{ minWidth: '200px' }}> Espace Bénévole</Button>

                            </LinkRouter>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Mobile */}
            <Box className='home' style={mystyle.opacity} sx={{ display: { md: 'none', xs: 'flex' }, width: '100%' }}>

                <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>

                    <Grid container xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }} spacing={4}>
                        <Grid item>
                            <Typography variant='h2' sx={{ color: '#FFF' }}>
                                EGDO
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h4' sx={{ color: '#FFF' }}>
                                L'association des Enfants de la Goutte d'or accompagne dans la durée les enfants, les jeunes mais aussi les adultes afin qu’ils prennnent leur place de citoyens.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        xs={12}
                        md={6}
                        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
                        spacing={8}>
                        <Grid item>
                            <LinkRouter
                                to='/espace-eleve'
                                variant="body2"
                                underline='none'
                                style={{ textDecoration: 'none' }}
                            >
                                <Button size='large' variant='contained' color='primary' sx={{ minWidth: '200px' }}> Espace Elève</Button>
                            </LinkRouter>
                        </Grid>
                        <Grid item>
                            <LinkRouter
                                to='/espace-insertion'
                                variant="body2"
                                underline='none'
                                style={{ textDecoration: 'none' }}
                            >
                                <Button size='large' variant='contained' color='primary' sx={{ minWidth: '200px' }}> Espace Insertion</Button>
                            </LinkRouter>
                        </Grid>
                        <Grid item>
                            <LinkRouter
                                to='/espace-benevole'
                                variant="body2"
                                underline='none'
                                style={{ textDecoration: 'none' }}
                            >
                                <Button size='large' variant='contained' color='primary' sx={{ minWidth: '200px' }}> Espace Bénévole</Button>
                            </LinkRouter>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>

    )
}

const mystyle = {
    img: {
        backgroundImage: `url("../images/general/bgi.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "95vh"
    },
    imgMobile: {
        backgroundImage: `url("../images/general/bgi.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "95vh",
        transform: 'rotate(-90deg)'
    },
    opacity: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        minHeight: "95vh"
    },
}
