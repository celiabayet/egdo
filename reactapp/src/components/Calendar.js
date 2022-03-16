import React, { useState, useEffect } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';

import { fr } from "date-fns/locale";

export default function Calendar({ events, setEvents, eventsDay, setEventsDay }) {

  const [date, setDate] = useState(new Date());
  const minDate = new Date();

  const dateFormat = function (d) {
    var newDate = new Date(d);
    var format = newDate.getDate() + '/' + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()
    return format
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
        <CalendarPicker color='secondary' minDate={minDate} value={date} date={date} onChange={(newDate) => setDate(newDate)} />
      </LocalizationProvider>
    </>
  );
}