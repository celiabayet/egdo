<<<<<<< HEAD:reactapp/src/screens/Home.js
import React, { useEffect } from 'react';
import { Grid, Button, Box, Container, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
import Link from '@mui/material/Link';

import '../stylesheets/App.css'
import '../stylesheets/Buttons.css'
import '../screens/discover/Discover.css'
=======
import React, {useEffect} from 'react';
import { Grid, Button, Box, Container, Typography, Link } from '@mui/material';
>>>>>>> finalDiscover:reactapp/src/screens/discover/Home.js

import AOS from "aos";
import "aos/dist/aos.css";

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

<<<<<<< HEAD:reactapp/src/screens/Home.js
                <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Grid container xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} spacing={4}>
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
=======
            <Container maxWidth='lg' sx={{display: 'flex', justifyContent:'center', alignItems:'center'}}>

                <Grid container 
                    xs={12}
                    md={6}
                    mx={3}
                    // my={0}
                    sx={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'50%'}}
                    spacing={4}>
                    <Grid item sx={{width:'100%'}}>
                        <Typography variant='h2' sx={{color:'#FFF'}}>
                            EGDO
                        </Typography>
                    {/* </Grid>
                    <Grid item> */}
                        <Typography variant='h4' sx={{color:'#FFF'}}>
                            L'association des Enfants de la Goutte d'or accompagne dans la durée les enfants, les jeunes mais aussi les adultes afin qu’ils prennnent leur place de citoyens.
                        </Typography>
>>>>>>> finalDiscover:reactapp/src/screens/discover/Home.js
                    </Grid>

<<<<<<< HEAD:reactapp/src/screens/Home.js
                    <Grid container xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} spacing={8}>
                        <Grid item data-aos="fade-left" data-aos-duration="1000">
                            <Link
                                href='/espace-eleve'
                                variant="body2"
                                underline='none'
=======
                <Grid 
                    container xs={12}
                    md={6}  
                    sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'50%'}}
                    spacing={8}>
                    <Grid item data-aos="fade-left" data-aos-duration="1000">
                        <Link
                            href='/espace-eleve'
                            variant="body2"
                            underline='none'
>>>>>>> finalDiscover:reactapp/src/screens/discover/Home.js
                            >
                                <Button size='large' variant='contained' color='secondary' sx={{ minWidth: '200px' }}> Espace Elève</Button>
                            </Link>
                        </Grid>
                        <Grid item data-aos="fade-left" data-aos-duration="2000">
                            <Link
                                href='/espace-insertion'
                                variant="body2"
                                underline='none'
                            >
                                <Button size='large' variant='contained' color='secondary' sx={{ minWidth: '200px' }}> Espace Insertion</Button>
                            </Link>
                        </Grid>
                        <Grid item data-aos="fade-left" data-aos-duration="3000">
                            <Link
                                href='/espace-benevole'
                                variant="body2"
                                underline='none'
                            >
                                <Button size='large' variant='contained' color='secondary' sx={{ minWidth: '200px' }}> Espace Bénévole</Button>
                            </Link>
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
                            <Link
                                href='/espace-eleve'
                                variant="body2"
                                underline='none'
                            >
                                <Button size='large' variant='contained' color='secondary' sx={{ minWidth: '200px' }}> Espace Elève</Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                href='/espace-insertion'
                                variant="body2"
                                underline='none'
                            >
                                <Button size='large' variant='contained' color='secondary' sx={{ minWidth: '200px' }}> Espace Insertion</Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                href='/espace-benevole'
                                variant="body2"
                                underline='none'
                            >
                                <Button size='large' variant='contained' color='secondary' sx={{ minWidth: '200px' }}> Espace Bénévole</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>

    )
}

const mystyle = {
    img: {
<<<<<<< HEAD:reactapp/src/screens/Home.js
        backgroundImage: `url("/images/bgi.jpg")`,
=======
        backgroundImage: `url("../images/bgi.jpg")`,
>>>>>>> finalDiscover:reactapp/src/screens/discover/Home.js
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "95vh"
    },
    imgMobile: {
        backgroundImage: `url("../images/bgi.jpg")`,
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