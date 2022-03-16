import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import ArticleCard from './ArticleCard';
import '../../stylesheets/App.css'

import { Container, Grid, Typography } from '@mui/material';

function Blog(props) {
    console.log(props.admin.token)
    const [allArticles, setAllArticles] = useState([]);

    useEffect(() => {
        async function getArticles() {
            var res = await fetch("/article/see-articles")
            res = await res.json();
            setAllArticles(res.articles);
        }
        getArticles();
    }, []);

    return (
        <>
            <Navbar nav={["Contact"]} />

            {/* Section Articles */}
            < div className='section'>
                <div className='opacity' style={{ paddingBottom: 60 }}>
                    <Container maxWidth="lg" sx={{ pt: 2 }} >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}
                            pb={4}
                        >
                            <Grid item >
                                <Typography variant='h2'>Tous nos articles</Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={8}>
                            {allArticles.map((article, i) => {
                                return (<ArticleCard articleFromBDD={article} />)
                            })}
                        </Grid>

                    </Container>
                </div>
            </div >
            <Footer />
        </>
    );
}

function mapStateToProps(state) {
    return { admin: state.admin }
}

export default connect(mapStateToProps, null)(Blog);