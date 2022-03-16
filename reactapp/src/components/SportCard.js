import React from 'react'
import { CardActionArea, Grid, Avatar, Typography, CardMedia, CardContent, Card } from '@mui/material';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Unique Key
import uuid from 'react-uuid';

export default function SportCard({ img, category, terrain, adress, coaches, city, sport }) {

  const hoursContainer = category.map((el, i) => {
    const trainingDays = el.trainingDays.map((d, i) => {
      return (<div key={uuid()} style={{ textAlign: 'center', borderBottom: "2px solid #003D55", paddingTop: 10 }}>
        <h6 style={{ fontWeight: 'bold' }}>{d.day}</h6>
        <h6>{d.hour}</h6></div>)
    })

    return (
      <div style={myStyle.divHours} key={uuid()} >
        <h4 style={{ paddingBottom: 5 }}>{el.gen}</h4>
        <h4 style={{ fontWeight: 'bold', paddingBottom: 5 }}>{el.cat}</h4>
        {trainingDays}
      </div>
    )
  })

  const coach = coaches.map(el => {
    return (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 100, hide: 200 }}
        overlay={(props) => (
          <Tooltip id="button-tooltip" {...props}>
            {el.replace(/\-[^-]*?$/, "").replace(/_/g, " ")}
          </Tooltip>
        )}>
        <Avatar
          alt={el}
          src={`./images/sportcards/coaches/${el}.jpg`}
          sx={{ width: 56, height: 56 }}
          key={uuid()}
        />
      </OverlayTrigger>)
  })

  return (
    <Grid item xs={10} md={6} lg={3} style={{ margin: '2rem ' }}>
      <Card style={{ height: 'auto' }} >
        <CardActionArea >
          <CardMedia
            style={{ height: "200px" }}
            component="img"
            image={`/images/sportcards/${img}.jpg`}
            alt="équipe"
          />
          <CardContent style={{ height: 'auto' }}>
            <Typography variant="body2" display='flex' justifyContent='center'>
              {hoursContainer}
            </Typography>

            <Typography variant="body" display='flex' justifyContent='center' sx={{ fontWeight: 'regular' }}>
              {terrain}
            </Typography>

            <Typography variant="body" display='flex' justifyContent='center' sx={{ fontWeight: 'regular' }}>
              {adress}
            </Typography>

            <Typography variant="body" display='flex' justifyContent='center' sx={{ fontWeight: 'regular' }}>
              {city}
            </Typography>

            {coaches.length > 0 ?
              <Typography variant="body2" display='flex' flexDirection='column' alignItems='center' sx={{ fontWeight: 'bold', marginTop: 2 }}>
                Entraineurs
                <Typography variant="body2" display='flex' justifyContent='center' sx={{ marginTop: 1 }}>
                  {coach}
                </Typography>
              </Typography>
              : null}

          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>

  );
}

const myStyle = {
  divHours: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.2rem 0.3rem',
    margin: '0.5rem'
  },
  categoryName: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'red',
    color: 'white',
    padding: '0 1rem'
  }
}