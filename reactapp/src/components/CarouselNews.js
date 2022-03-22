import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from '@mui/material'

const CarouselNews = ({ news }) => {

  const newsToDisplay = news.map((item, i) => {
    return (<Carousel.Item key={i}>
      <img
        className="d-block mx-auto w-100"
        src={item.img}
        alt="First slide"
        style={{ height: "500px", objectFit: "cover", borderRadius: 30 }} />
      <Carousel.Caption style={myStyle.carouselText}>
        <h3>{item.title}</h3>
        <p>{item.subtitle}</p>
      </Carousel.Caption>
    </Carousel.Item>)
  });

  return (
    <Grid container xs={12} style={myStyle.carouselNews}>
      <Grid item xs={10} md={8} justifyContent='center'>
        <Carousel controls={false}  >
          {newsToDisplay}
        </Carousel>
      </Grid>
    </Grid>
  )
}

export default CarouselNews

const myStyle = {
  carouselNews: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  carouselText: {
    backgroundColor: 'rgb(0,0,0,0.8)',
    alignSelf: 'center',
    borderRadius: 30,
    paddingLeft: 50,
    paddingRight: 50
  }
}
