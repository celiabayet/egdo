import React, { useState, useEffect } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { TextField } from '@mui/material'

import { fr } from "date-fns/locale";

export default function Calendar({ events, setEvents, eventsDay, setEventsDay }) {
    const [date, setDate] = useState(new Date());
    console.log(date)
    const minDate = new Date();

    const dateFormat = function (d) {
        var newDate = new Date(d);
        var format = newDate.getDate() + '/' + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()
        return format
    }

    let eventsDates = events.map(e => e.date);
    console.log(eventsDates);

    for (let i = 0; i < eventsDates.length; i++) {
        eventsDates[i] = new Date(eventsDates[i]);
        eventsDates[i] = new Date(eventsDates[i].getFullYear(), eventsDates[i].getMonth(), eventsDates[i].getDate());
        eventsDates[i] = eventsDates[i].toDateString();
    }

    function nothingHappensOnThisDay(date) {
        date = date.toDateString();
        return !eventsDates.includes(date);
    }

    useEffect(() => {
        const eventsForDateSelect = async () => {

            const newDateSelect = dateFormat(date)

            const eventsFilter = events.filter(event => {
                const dateEvent = dateFormat(event.date)
                return newDateSelect == dateEvent
            })

            eventsFilter.length !== 0 ? setEventsDay(eventsFilter) : setEventsDay([])
        }

        eventsForDateSelect()

    }, [date])

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={fr} >
                <StaticDatePicker
                    orientation="portrait"
                    openTo="day"
                    value={date}
                    shouldDisableDate={nothingHappensOnThisDay}
                    onChange={(newDate) => {
                        setDate(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    toolbarTitle="Sélectionnez une date."
                    sx={{
                        ".MuiTypography-root": {
                            marginLeft: "1rem"
                        },
                        ".MuiTypography-h4": {
                            marginLeft: "1rem"
                        },
                        ".PrivateDatePickerToolbar-penIcon": {
                            display: "none"
                        }
                    }}
                />
            </LocalizationProvider>
        </>
    );
}

// const useStyles = makeStyles((theme) => ({
//     dayWithDotContainer: {
//         position: 'relative'
//     },
//     dayWithDot: {
//         position: 'absolute',
//         height: 0,
//         width: 0,
//         border: '2px solid',
//         borderRadius: 4,
//         borderColor: theme.palette.primary.main,
//         right: '50%',
//         transform: 'translateX(1px)',
//         top: '80%'
//     }
// }))