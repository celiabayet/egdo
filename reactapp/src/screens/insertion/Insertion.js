import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../student/Student.css';
import './Insertion.css';
import CarouselNews from '../student/assets/CarouselNews';
import Footer from ".//../../components/Footer";
import Navbar from "../../components/Navbar";

import { Grid, Button } from '@mui/material'

// Unique key
import uuid from 'react-uuid'

// Components
import CardEvents from '../student/assets/CardEvents'
import SportCard from '../student/assets/SportCard'
import Calendar from '../student/assets/Calendar'
import { AdultTabs } from '../student/assets/Tabs'

const Insertion = (props) => {

    const [events, setEvents] = useState([]);
    const [eventsDay, setEventsDay] = useState([]);
    const [clicked, setClicked] = useState(false);

    const dateFormat = function (d) {
        var newDate = new Date(d);
        var format = newDate.getDate() + '/' + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()
        return format
    }

    const dateToday = new Date()
    const dateTodayFormat = dateFormat(dateToday)

    useEffect(() => {

        const fetchEvents = async () => {
            const res = await fetch('/event/see-events/insertion')
            const allEvents = await res.json()
            await setEvents(allEvents.events)
        }
        fetchEvents();
        const todayEvents = () => {

            const eventsTodayFilter = events.filter(event => {
                const eventDay = dateFormat(event.date)
                return dateTodayFormat == eventDay
            })

            if (eventsTodayFilter.length !== 0) {
                setEventsDay(eventsTodayFilter)
            }
        }
        todayEvents();
        setClicked(false);
    }, [])

    const eventsData = eventsDay.map(({ title, description, type, date, maxNumberOfPeople }) => {

        return (<CardEvents
            key={uuid()}
            title={title}
            desc={description}
            img={`${type.replace(/\s/g, '-').replace(/é|è/g, 'e').replace(/à|â/g, "a")}.jpg`}
            date={date}
            maxPeople={maxNumberOfPeople}
        />)
    })

    const SportInclusion = [
        {
            id: "inclusport", img: "../images/insertion/inclusport.jpg", imgDesc: "programme-inclusport",
            title: "Inclu'Sport",
            content: "Une initiative visant à accompagner les réfugiés et migrants licenciés au club en valorisant leur parcours"
        },
        {
            id: "accompagnement-tutore", img: "../images/insertion/accompagnement-tutore.jpg", imgDesc: "accompagnement-tutoré",
            title: "Accompagnement tutoré",
            content: "Un programme assuré par un adulte du club pour tous les jeunes susceptibles d’évoluer vers un rôle d’encadrant"
        },
        {
            id: "sport-et-emploi", img: "../images/insertion/sport-et-emploi.jpg", imgDesc: "sport-et-emploi",
            title: "Sport & Emploi",
            content: "Un ensemble d'actions pour ramener les jeunes les plus en difficulté vers un cadre plus sain, via le sport et le lien social"
        },
    ]
    const nav = ["Evénements", "Sport & Insertion", "Football", "Taekwondo", "Contact"]

    const sendArticleToStore = async (title) => {
        const res = await fetch(`/article/send-article-to-store/${title}`);
        const article = await res.json();
        props.onChooseArticle(article.article);
        setClicked(true);
    }

    if (props.article && clicked) {
        return (
            <Redirect to='/article' />
        )
    } else {
        return (
            <>
                <Navbar nav={nav} />
                {/* <div className='Student' 
            // style={myStyle.studentContainer} 
            id="Accueil"> */}
                <div div className='section'>
                    <div className='opacity'>
                        <CarouselNews news={[
                            {
                                img: '/images/insertion/jeux-de-l-emploi.jpg',
                                title: "JE 2024 : Les Jeux de l'Emploi !",
                                subtitle: "Un événement festif, sportif et citoyen, qui promeut la pratique du sport comme vectrice d’insertion sociale. A retrouver samedi au Gymnase de la Goutte d'Or !"
                            },
                            {
                                img: '/images/insertion/temoignage-adama.jpg',
                                title: "Vivre sa vie en musique...",
                                subtitle: `Adama, jeune de la Goutte d'Or, témoigne sur son parcours de trompettiste dans "La réussite est un long parcours", nouveau documentaire de Valérie Potonniée.`
                            }]} />
                    </div>
                </div>
                <div div className='section2'>
                    <div className='opacity'>
                        <div className='sorties' id="Evénements" >
                            <h1>Prochains événements</h1>

                            <div style={myStyle.upcomingEvents} >

                                {eventsData}

                                <Grid item xs={12} md={4} style={{ margin: '1rem' }}>
                                    <Calendar />
                                </Grid>

                            </div>
                        </div>
                    </div>
                </div>

                <div div className='section'>
                    <div className='opacity'>

                        <Grid container xs={12} minHeight='100vh' justifyContent='center' className='sport-inclusion' id="Sport & Insertion">
                            <Grid item xs={12}> <h1 style={{ textAlign: "center" }}>Nos programmes Sport & Insertion</h1></Grid>
                            {SportInclusion.map((card, index) => {
                                return (
                                    <Grid key={index} height='300px' item xs={11} md={3.5} className={`${card.id}-info-container`} style={{ margin: ' 1rem ' }}>
                                        <div className="adult-sports-name">
                                            <h1 style={{ color: "white", fontSize: 45, textShadow: "black 2px 3px", textWrap: "wrap" }}>{card.title}</h1>
                                        </div>
                                        <div className="adult-sports-text">
                                            <p style={{ marginBottom: 25 }}>{card.content}</p>
                                            <Button variant="contained" style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }} onClick={() => sendArticleToStore(card.title)}>En savoir plus</Button>
                                        </div>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>
                </div>

                <div div className='section2'>
                    <div className='opacity'>
                        <Grid container xs={12} height='100vh' className='football' id="Football" >
                            <Grid item xs={11} md={8} className="football-info-container">
                                <div className="sports-name">
                                    <h1 style={{ color: "white", fontSize: 75, textShadow: "black 2px 3px" }}>Football</h1>
                                </div>
                                <div className="sports-text">
                                    <p style={{ marginBottom: 25 }}>Alliant l'éducatif au sportif, le club de foot d'EGDO est animé avec passion par des coachs du quartier. Il comporte des équipes pour tous les âges.</p>
                                    <Button variant="contained" style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }}>Je m'inscris</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div div className='section'>
                    <div className='opacity'>
                        <div className='football-info'>
                            <h1 style={{ textAlign: "center" }}>Les entraînements</h1>

                            <Grid container xs={12} justifyContent="center">
                                <SportCard
                                    terrain="Gymnase de la Goutte d'Or"
                                    adress='12 rue de la Goutte d’Or'
                                    city='75018 Paris'
                                    img='u16tkw'
                                    category={[{ gen: "Taekwondo", cat: '17 ans et +', trainingDays: [{ day: 'Mardi', hour: 'de 19h30 à 20h30' }, { day: 'Samedi', hour: 'de 15h45 à 17h' }] }]}
                                    coaches={[]}
                                    sport='tkw'
                                />

                                <SportCard
                                    terrain="Gymnase de la Goutte d'Or"
                                    adress='12 rue de la Goutte d’Or'
                                    city='75018 Paris'
                                    img='tkwu12'
                                    category={[{ gen: "Body Tae Féminin", cat: '15 ans et +', trainingDays: [{ day: 'Mardi', hour: 'de 20h30 à 21h30' }, { day: 'Samedi', hour: 'de 13h à 14h' }] }]}
                                    coaches={[]}
                                    sport='tkw'
                                />

                            </Grid>
                            <Footer />
                        </div>
                    </div >
                </div >

                <div div className='section2'>
                    <div className='opacity'>
                        <Grid container xs={12} className='taekwondo' id="Taekwondo">
                            <Grid item xs={11} md={5} height='500px' className="taekwondo-info-container" style={{ margin: '2rem' }}>
                                <div className="sports-name">
                                    <h1 style={{ color: "#4c83bc", fontSize: 75, textShadow: "white 2px 3px" }}>Taekwondo</h1>
                                </div>
                                <div className="sports-text">
                                    <p style={{ marginBottom: 25 }}>Au sein d'EGDO, on pratique un art martial olympique depuis un quart de siècle ! Le taekwondo est proposé en mixte dans la salle Cap-Dadi du gymnase de la Goutte d’Or.</p>
                                    <a href="/student/files/inscription-tkw.pdf" download style={{ textDecoration: 'none', alignSelf: 'center' }}> <Button variant="contained" style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }}>Je m'inscris</Button></a>
                                </div>
                            </Grid>


                            <Grid item xs={11} md={5} className="bodytae-info-container" height='500px' style={{ margin: '2rem' }} >
                                <div className="sports-name">
                                    <h1 style={{ color: "white", fontSize: 75, textShadow: "black 2px 3px" }}>Body Tae Féminin</h1>
                                </div>
                                <div className="sports-text">
                                    <p style={{ marginBottom: 25 }}>Le Body Taekwondo féminin est un mélange de fitness et de taekwondo en musique qui développe la coordination, la psychomotricité et la perception du corps dans l'espace.</p>
                                    <a href="/student/files/inscription-tkw-f.pdf" download style={{ textDecoration: 'none', alignSelf: 'center' }}> <Button variant="contained" style={{ backgroundColor: '#003D55', width: '180px', alignSelf: 'center', borderRadius: 15 }}>Je m'inscris</Button></a>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div div className='section'>
                    <div className='opacity'>
                        <h1 style={{ textAlign: "center" }}>Les entraînements</h1>

                        <Grid container xs={12} justifyContent="center">
                            <SportCard
                                terrain="Gymnase de la Goutte d'Or"
                                adress='12 rue de la Goutte d’Or'
                                city='75018 Paris'
                                img='u16tkw'
                                category={[{ gen: "Taekwondo", cat: '17 ans et +', trainingDays: [{ day: 'Mardi', hour: 'de 19h30 à 20h30' }, { day: 'Samedi', hour: 'de 15h45 à 17h' }] }]}
                                coaches={[]}
                                sport='tkw'
                            />

                            <SportCard
                                terrain="Gymnase de la Goutte d'Or"
                                adress='12 rue de la Goutte d’Or'
                                city='75018 Paris'
                                img='tkwu12'
                                category={[{ gen: "Body Tae Féminin", cat: '15 ans et +', trainingDays: [{ day: 'Mardi', hour: 'de 20h30 à 21h30' }, { day: 'Samedi', hour: 'de 13h à 14h' }] }]}
                                coaches={[]}
                                sport='tkw'
                            />

                        </Grid>
                    </div>
                </div>
                <Footer />
                {/* </div> */}
            </>
        )
    }
}

const myStyle = {
    upcomingEvents: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%'
    }
}

function mapStateToProps(state) {
    return { article: state.article }
}

function mapDispatchToProps(dispatch) {
    return {
        onChooseArticle: function (article) {
            dispatch({ type: 'chooseArticle', article })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Insertion);