import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { Typography, Button, CardMedia, CardContent, CardActions, Card } from '@mui/material';

export default function Cards(props) {

    return (
        <Card id={props.cardID}>
            <CardMedia
                component="img"
                height="120"
                image={props.img}
                alt={props.imgDesc}
            />
            <CardContent className='background-img' style={styles.container}>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2">
                    {props.content}
                </Typography>
                <CardActions>
                    <LinkRouter to="/blog" style={{ textDecoration: "none" }}><Button variant="contained" color="primary">{props.button}</Button></LinkRouter>
                </CardActions>
            </CardContent>
        </Card>
    )
}
const styles = {
    container: {
        background: `radial-gradient(circle, rgba(250,250,250,0.95) 0%, rgba(250,250,250,0.9) 81%), url("/images/general/light-blue.jpg")`,
    }
};