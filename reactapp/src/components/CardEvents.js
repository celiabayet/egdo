import React from 'react'
import { Grid } from '@mui/material'

import ModalEvent from './ModalEvent'

// Day JS
import DayJS from 'react-dayjs';

function CardEvents({ img, title, desc, date, selectEvent, maxPeople }) {

    // Style
    const mystyle = {
        leftPanel: {
            minHeight: "200px",
            minWidth: '200px',
            backgroundImage: `url(/images/events/${img})`,
            backgroundPosition: 'center',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.3)",
            margin: '1rem',
            borderRadius: 20
        },
        opacityBlock: {
            position: 'relative',
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#F4E4C1",
            borderRadius: 20
        },
        date: {
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#FEFEE2',
            color: '#080F5B',
            padding: '0 1rem',
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10
        }
    }

    // Date Format

    const newDate = <DayJS format="D/M/YYYY">{date}</DayJS>
    if (maxPeople !== 0) {
        return (
            <Grid item xs={10} md={4} style={mystyle.leftPanel}>
                <Grid item style={mystyle.opacityBlock} >
                    <span style={mystyle.date}>{newDate}</span>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h2 style={{ fontWeight: "500" }}>{title}</h2>
                        <p style={{textAlign:'center',padding:'0 2rem'}}>{desc}</p>

                        <ModalEvent
                            eventTitle={title}
                            eventDate={newDate}
                        />
                    </div>
                </Grid>
            </Grid>
        )
    }
    else {

        return (
            <Grid item xs={12} md={4} style={mystyle.leftPanel}>
                <Grid item style={mystyle.opacityBlock} >
                    <span style={mystyle.date}>Plus de places disponibles</span>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h2 style={{ fontWeight: "500" }}>{title}</h2>
                        <p>{desc}</p>

                    </div>
                </Grid>
            </Grid>
        )

    }

}

export default CardEvents