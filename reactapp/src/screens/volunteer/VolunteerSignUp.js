import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Grid, Input, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, FormGroup } from '@mui/material';

const steps = ['Nom', 'Niveaux', 'Jours'];
const groups = [
    { label: 'CP au CM1', value: 'CP au CM1' },
    { label: 'CM2 à 6ème', value: 'CM2 à 6ème' },
    { label: '5ème à 3ème', value: '5ème à 3ème' },
    { label: 'Lycée', value: 'Lycée' }];

const cases = groups.map(group => group.value);
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function VolunteerSignUp() {

    const [activeStep, setActiveStep] = useState(0);
    const [filled, setFilled] = useState('false')
    const [firstName, setFirstName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [group, setGroup] = useState('');
    const [calendar, setCalendar] = useState([]);
    const [monthCalendar, setMonthCalendar] = useState([]);
    const [dayChoosen, setDayChoosen] = useState([]);
    const [endForm, setEndForm] = useState(false)

    useEffect(() => {
        async function getCalendar() {
            var res = await fetch("/volunteer")
            res = await res.json();
            setCalendar(res.calendarBenevole)
            //console.log(res)
        }
        getCalendar();
    }, []);

    useEffect(() => {
        async function calendarChoices() {
            // console.log(calendar[0].date.getMonth())
            let choices = calendar.filter(choice => choice.group === group)
            console.log(choices)
            setMonthCalendar(choices)
        }
        calendarChoices();
    }, [group]);

    async function addVolunteer(name, firstName, email) {
        if (emailRegex.test(email) && name.length != 0 && firstName.length != 0 && email.length != 0) {
            setFilled(true);
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        } else {
            setFilled(false)
        }
        if (activeStep == steps.length - 1) {
            setEndForm(true)

            const newVolunteer = {
                name: name,
                firstName: firstName,
                email: email,
                group: group,
                date: dayChoosen
            };

            var res = await fetch("/volunteer/add-volunteer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newVolunteer),
            });
            res = await res.json();
            console.log(res);
        }
    };

    const handleClickCalendar = (date) => {
        setDayChoosen([...dayChoosen, date])
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    if (!endForm) {
        return (
            <Grid container direction='column' justifyContent="center" alignItems="center" spacing={4}>
                <Grid item>
                    <Typography variant='h5'>
                        Inscription soutien scolaire mois de Mars
                    </Typography>
                </Grid>
                <Grid item>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Grid>



                {activeStep === 0 ?
                    <>
                        {filled === false && <Grid item> <Typography variant='body2'>Vous devez remplir les cases</Typography></Grid>}


                        <Grid item>
                            <Input placeholder="Prénom" type='string' required='true' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        </Grid>

                        <Grid item>
                            <Input placeholder="Nom" type='string' required='true' onChange={(e) => setName(e.target.value)} value={name} />
                        </Grid>
                        <Grid item>
                            <Input placeholder="john.doe@gmail.com" type='email' required='true' onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Grid>

                    </>

                    : (activeStep === 1 ?
                        <Grid item>
                            <FormControl>
                                {/* <FormLabel id="demo-radio-buttons-group-label">Quel niveau ?</FormLabel> */}
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    // defaultValue='CP au CM1'
                                    name="radio-buttons-group"
                                >
                                    {groups.map(group => {
                                        return (<FormControlLabel
                                            value={group.value}
                                            control={<Radio />}
                                            label={group.label}
                                            onClick={(e) => setGroup(e.target.value)} />)

                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        :
                        <Grid item>
                            <FormGroup>
                                {monthCalendar.map(obj => {
                                    let date = obj.date;
                                    date = new Date(date)
                                    let day = date.toLocaleDateString("fr-FR",
                                        { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
                                    // let day = date.getDay();
                                    // let month = date.getMonth()
                                    return (
                                        <FormControlLabel control={<Checkbox />} label={day} value={date} onClick={e => handleClickCalendar(e.target.value)} />
                                    )
                                })}
                            </FormGroup>
                        </Grid>)

                }

                <Grid item>
                    <Button
                        // color="primary"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Retour
                    </Button>
                    <Button onClick={() => addVolunteer(name, firstName, email, group, dayChoosen)}>
                        {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                    </Button>
                </Grid>

            </Grid>)
    } else {
        return (
            <Grid container justifyContent='center' alignItems='center' >
                <Grid item>
                    <Typography variant='h5' sx={{ fontSize: 25 }}>
                        Vos choix ont bien été enregistrés, votre calendrier pour le mois de mars vous a été envoyé sur votre boîte mail.
                    </Typography>
                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        )
    }
}
