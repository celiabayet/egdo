import React from 'react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VolunteerSignUp from './VolunteerSignUp';
import CarouselNews from '../../components/CarouselNews';

import '../../stylesheets/App.css'

import { Container, Grid, Typography } from '@mui/material';


export default function Volunteer() {

    const nav = ["Actualités", "Soutien Scolaire", "Contact"];
    return (
        <>
            {/* Navbar */}
            <Navbar nav={nav} />

            {/* Caroussel */}
            <div className='section' id={nav[0]}>
                <div className='opacity' style={{ display: 'flex', flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant='h3'>Actualités</Typography>
                    <CarouselNews
                        news={[
                            {
                                img: '/images/articles/Les-Ateliers-culturels-EGDO.jpg',
                                title: "Ateliers culturels",
                                subtitle: "Les ateliers culturels d'EGDO permettent de revisiter les contenus scolaires d’une autre manière"
                            },
                            {
                                img: '/student/imgs/asterix.avif',
                                title: "Sortie au Parc Astérix",
                                subtitle: "Onze jeunes de l'association EGDO ont eu la chance de passer une journée chez les Gaulois !"
                            }]} />

                </div>
            </div>

            {/* Home page */}
            <div className='section2' id={nav[1]}>
                <div className='opacity' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <VolunteerSignUp />

                </div>
            </div>

            <div id={nav[2]}>
                <Footer />
            </div>
        </>
    );
}