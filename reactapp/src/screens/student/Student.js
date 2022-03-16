import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import '../../stylesheets/Student.css';
import CarouselNews from '../../components/CarouselNews';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Grid, Button, Typography } from '@mui/material'

// Unique key
import uuid from 'react-uuid'

// Components
import CardEvents from '../../components/CardEvents'
import SportCard from '../../components/SportCard'
import Calendar from '../../components/Calendar'
import { StudentTabs } from '../../components/Tabs'
import { EventNoteSharp } from '@mui/icons-material';

const Student = (props) => {

  const [events, setEvents] = useState([])
  const [eventsDay, setEventsDay] = useState([])

  const dateFormat = function (d) {
    var newDate = new Date(d);
    var format = newDate.getDate() + '/' + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()
    return format
  }

  const dateToday = new Date()
  const dateTodayFormat = dateFormat(dateToday)

  useEffect(() => {

    const fetchEvents = async () => {
      const res = await fetch('/event/see-events/students')
      const allEvents = await res.json()
      await setEvents(allEvents.events)
    }
    fetchEvents()

    const todayEvents = () => {

      const eventsTodayFilter = events.filter(event => {
        const eventDay = dateFormat(event.date)
        return dateTodayFormat == eventDay
      })

      if (eventsTodayFilter.length !== 0) {
        setEventsDay(eventsTodayFilter)
      }
    }
    todayEvents()

  }, [])

  const eventsData = eventsDay.map(({ title, description, type, date, maxNumberOfPeople }) => {

    return (<CardEvents
      key={uuid()}
      title={title}
      desc={description}
      img={`${type.replace(/\s|'/g, '-').replace(/é|è/g, 'e').replace(/à|â/g, "a")}.jpg`}
      date={date}
      maxPeople={maxNumberOfPeople}
    />)
  })

  let nav = ["Actualités", "Sorties", "Football", "Taekwondo", "Contact"];

  return (
    <>
      <Navbar nav={nav} />
      {/* <div className='Student' style={myStyle.studentContainer} > */}
      <div div className='section' id={nav[0]} >
        <div className='opacity'>
          <Typography variant='h3'>Actualités</Typography>
          <CarouselNews
            news={[
              {
                img: '/images/sportcards/tkwu12.jpg',
                title: "Saison 2022-2023 : Inscriptions !",
                subtitle: "Ouverture des inscriptions pour le Taekwondo."
              },
              {
                img: '/images/student/asterix.avif',
                title: "Sortie au Parc Astérix",
                subtitle: "Onze jeunes de l'association EGDO ont eu la chance de passer une journée chez les Gaulois !"
              }]} />
        </div>
      </div>


      <div div className='section2' id={nav[1]} >
        <div className='opacity'>
          <Typography variant='h3' pt={3}>Prochains événements</Typography>
          <Grid container justifyContent="center" style={{ paddingBottom: '2rem' }}>
            <Grid item xs={12} md={5} style={{ margin: '1rem' }}>
              <Calendar events={events} setEvents={setEvents} eventsDay={eventsDay} setEventsDay={setEventsDay} />
            </Grid>
            <Grid item xs={12} style={{ margin: '1rem' }}>{eventsDay.length > 0 && <h2 style={{ textAlign: 'center', color: "dark" }}> {eventsDay.length} {eventsDay.length > 1 ? 'Activités disponibles' : 'Activité disponible'}</h2>}</Grid>
            {eventsData}
          </Grid>
        </div>
      </div>

      {/* Football */}
      <div div className='section' id={nav[2]} >
        <div className='opacity'>
          <Grid container xs={12} height='100vh' className='football' id="Football" >
            <Grid item xs={11} md={8} className="football-info-container">
              <div className="sports-name">
                <h1 style={{ color: "white", fontSize: 75, textShadow: "black 2px 3px" }}>Football</h1>
              </div>
              <div className="sports-text">
                <p style={{ marginBottom: 25 }}>Alliant l'éducatif au sportif, le club de foot d'EGDO est animé avec passion par des coachs du quartier. Il comporte des équipes pour tous les âges.</p>
                <Button variant="contained" color='primary'
                // style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }}
                >Je m'inscris</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <div div className='section2' >
        <div className='opacity'>
          <div className='football-info'>
            <StudentTabs />
          </div>
        </div>
      </div>


      {/* Taekwendo */}
      <div div className='section' id={nav[3]} >
        <div className='opacity'>
          <Grid container xs={12} className='taekwondo'
          // id="Taekwondo"
          >
            <Grid item xs={11} md={5} className="taekwondo-info-container" height='500px' style={{ margin: '2rem' }}>
              <div className="sports-name">
                <h1 style={{ color: "#4c83bc", fontSize: 75, textShadow: "white 2px 3px" }}>Taekwondo</h1>
              </div>
              <div className="sports-text">
                <p style={{ marginBottom: 25 }}>Au sein d'EGDO, on pratique un art martial olympique depuis un quart de siècle ! Le taekwondo est proposé en mixte dans la salle Cap-Dadi du gymnase de la Goutte d’Or.</p>
                <a href="/files/inscription-tkw.pdf" download style={{ textDecoration: 'none', alignSelf: 'center' }}> <Button variant="contained" style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }}>Je m'inscris</Button></a>
              </div>
            </Grid>

            <Grid item xs={11} md={5} className="bodytae-info-container" height='500px' style={{ margin: '2rem' }}>
              <div className="sports-name">
                <h1 style={{ color: "white", fontSize: 75, textShadow: "black 2px 3px" }}>Body Tae Féminin</h1>
              </div>
              <div className="sports-text">
                <p style={{ marginBottom: 25 }}>Le Body Taekwondo féminin est un mélange de fitness et de taekwondo en musique qui développe la coordination, la psychomotricité et la perception du corps dans l'espace.</p>
                <a href="/files/inscription-tkw-f.pdf" download style={{ textDecoration: 'none', alignSelf: 'center' }}> <Button variant="contained" style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }}>Je m'inscris</Button></a>
              </div>
            </Grid>
          </Grid>

        </div>
      </div>

      <div div className='section2'  >
        <div className='opacity'>
          <Grid container xs={12} justifyContent='center' alignItems='center'>

            <SportCard
              terrain="Gymnase de la Goutte d'Or"
              adress='12 rue de la Goutte d’Or'
              city='75018 Paris'
              img='tkw-6a'
              category={[{ cat: '6-8 ans', trainingDays: [{ day: 'Mardi', hour: 'De 17h45 à 18h30' }, { day: 'Samedi', hour: 'De 14h00 à 14h45' }] }]}
              coaches={[]}
              sport='tkw'
            />

            <SportCard
              terrain="Gymnase de la Goutte d'Or"
              adress='12 rue de la Goutte d’Or'
              city='75018 Paris'
              img='tkwu12'
              category={[{ cat: '9-11 ans', trainingDays: [{ day: 'Mardi', hour: 'de 18h30 à 19h30' }, { day: 'Samedi', hour: 'de 14h45 à 15h45' }] }]}
              coaches={[]}
              sport='tkw'
            />

            <SportCard
              terrain="Gymnase de la Goutte d'Or"
              adress='12 rue de la Goutte d’Or'
              city='75018 Paris'
              img='u16tkw'
              category={[{ cat: '12-17 ans', trainingDays: [{ day: 'Mardi', hour: 'de 19h30 à 20h30' }, { day: 'Samedi', hour: 'de 15h45 à 17h00' }] }]}
              coaches={[]}
              sport='tkw'
            />

          </Grid>
        </div>
      </div>

      <div id={nav[4]}>
        <Footer />
      </div>
    </>
  )
}

const myStyle = {
  studentContainer: {
    backgroundImage: `url(./student/imgs/bg-student.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  },
  upcomingEvents: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%'
  }
}

function mapStateToProps(state) {
  return { admin: state.admin }
}

export default connect(mapStateToProps, null)(Student);