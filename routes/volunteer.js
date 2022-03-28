var express = require('express');
var router = express.Router();
var request = require('sync-request');

var volunteerModel = require('../models/volunteers')


// Fill database with calendar days with groups and times
router.get('/', async function (req, res, net) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    var requete = request('GET', `https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=&facet=start_date&facet=location&refine.location=Paris&refine.start_date=${year}`);
    var result = JSON.parse(requete.body);
 
    let holidays =[];
    result.records.map(holiday => {
        let start = new Date(holiday.fields.start_date);
        let end = new Date(holiday.fields.end_date)

        for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
            holidays.push(new Date(d));
        }
    })
    holidays = holidays.map(day => day.toString())
    const start = new Date(2022 , 02, 1);
    const end = new Date(2022, 02, 31);
    // const start = new Date(year ,month==0 ? 11 :  month, 1);
    // const end = new Date(year, month==11 ? 0 : month+2, 1);
    // console.log(start.toUTCString())
    // console.log(end.toUTCString())
    // console.log(month)
    // console.log(date.toUTCString())
    let calendar = [];
    for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
            calendar.push(new Date(d));
        }
    calendar = calendar.map(day => day.toString())
    
    let benevoleCalendar = calendar.filter(day => !holidays.includes(day))

    for (let day of benevoleCalendar){
        let d = new Date(day);
        if (d.getDay()===1||d.getDay()===2||d.getDay()===4||d.getDay()===5){
            const data = await volunteerModel.findOne({
                date: d
            })
            if (data==null) {
                let newVolunteer = new volunteerModel({
                    date: d,
                    time: "16h-18h",
                    group: 'CP au CM1'
                })
                let saveVolunteer = await newVolunteer.save()
            }
        }  
        if (d.getDay()===2||d.getDay()===4){
            const data = await volunteerModel.findOne({
                date: d,
                time : "18h30-20h"
            })
            if (data==null) {
                let newVolunteer = new volunteerModel({
                    date: d,
                    time: "18h30-20h",
                    group: 'CM2 à 6ème'
                })
                let saveVolunteer = await newVolunteer.save()
            }
        } 
        if (d.getDay()===2||d.getDay()===4){
            const data = await volunteerModel.findOne({
                date: d,
                // time : "18h30-20h",
                group: 'Lycée'
            })
            if (data==null) {
                let newVolunteer = new volunteerModel({
                    date: d,
                    time: "18h30-20h",
                    group: 'Lycée'
                })
                let saveVolunteer = await newVolunteer.save()
            }
            
        }
        if (d.getDay()===1||d.getDay()===3){
            const data = await volunteerModel.findOne({
                date: d,
                group: '5ème à 3ème'
            })
            if (data==null) {
                let newVolunteer = new volunteerModel({
                    date: d,
                    time: "18h30-20h",
                    group: '5ème à 3ème'
                })
                let saveVolunteer = await newVolunteer.save()
            }
        }
    }
    const calendarBenevole = await volunteerModel.find()
    
    res.json({calendarBenevole});
})


// Update DataBase with volunteers
router.post('/add-volunteer', async function (req, res, next) {
  var error = [];
  var result = "Il ne s'est rien passé";
  var saveVolunteer = null;
    
    for (let date of req.body.date){
        console.log(new Date(date))
         
        await volunteerModel.updateOne(
        { date: new Date(date), group: req.body.group},
        { $push: {users: {name: req.body.name, firstName:req.body.firstName, email:req.body.email}}}
        );
    }
    
  const data = await volunteerModel.find()
 console.log(data[0].date)

  res.json({ result })
})

module.exports = router