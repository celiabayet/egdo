import React from 'react';
import { connect } from 'react-redux';

import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import { Link } from '@mui/material'

import '../../stylesheets/Modal.css';

function ArticleCard(props) {

    return (
        <Grid item xs={12} sm={6} md={4} >
            <Card>
                <CardMedia style={{ height: "250px" }}>
                    <img src={`/images/articles/${props.articleFromBDD.title.replace(/\s|'/g, '-').replace(/é|è/g, 'e').replace(/à|â/g, "a")}.jpg`} alt={props.articleFromBDD.title} style={{ height: "100%" }}>
                    </img>
                </CardMedia>
                <CardContent className='background-img' style={styles.container}>
                    <Typography style={styles.title} component="div">
                        {props.articleFromBDD.title}
                    </Typography>
                    <Typography variant="body2">
                        {props.articleFromBDD.content.slice(0, 130)}...
                    </Typography>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={() => props.onChooseArticle(props.articleFromBDD)}>
                            <LinkRouter to="/article" style={{ textDecoration: 'none' }}>
                                <Link underline='none'>
                                    Lire la suite...
                                </Link>

                            </LinkRouter>
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}

const styles = {
    container: {
        background: `radial-gradient(circle, rgba(250,250,250,0.7) 0%, rgba(250,250,250,0.9) 81%), url("/images/general/light-blue.jpg")`,
    },
    title: {
        minHeight: "60px",
        fontWeight: 500,
        fontSize: 22,
        textAlign: "center",
        lineHeight: 1.2
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onChooseArticle: function (article) {
            dispatch({ type: 'chooseArticle', article })
        }
    }
}

export default connect(null, mapDispatchToProps)(ArticleCard);