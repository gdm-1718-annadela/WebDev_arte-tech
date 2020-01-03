import React, { useState, useEffect, Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function Jobs () {
    const [hoursData, setHoursData] = useState("")
    const [dateOne, setDateOne] = useState("")
    const [dateTwo, setDateTwo] = useState("")

    // const [time, setTime] = useState("")
    let hoursWork = "";
    let time = "";
    let token = localStorage.getItem('token')

    let url ="http://localhost:8888/web/jsonapi/node/taak?filter[author-filter][condition][path]=uid.id&filter[author-filter][condition][value]=329d9212-855f-44b7-aee3-77c2b2e07fb5&fields[node--taak]=title,field_startuur,field_einduur,field_pauze,field_datum"

    function getHoursData(){
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' +  token
            },
        }).then((response)=> {
            return response.json()
        }).then((data)=> {
            console.log(data.data)
            setHoursData(data.data)
        })
    }

   
    useEffect(getHoursData,[])

    if(hoursData != ""){
        getHours()
    }

    function getHours(){
        for(let i = 0; i < hoursData.length; i++){
            let startHour = hoursData[i].attributes.field_startuur;
            let finalHour = hoursData[i].attributes.field_einduur;
            let breakHour = hoursData[i].attributes.field_pauze * 60;
            let totalSec = finalHour - startHour - breakHour;
            hoursWork = parseInt(hoursWork + totalSec)
        }
    }

    function secondsToHours(){
        console.log(hoursWork)
        let min = hoursWork/60
        console.log(min)
        let restMin = min%60
        let hour = (min - restMin)/60
        console.log(hour+":"+restMin)
        time = hour+":"+restMin;

    }

    function handleSubmit(){
        console.log("hi")
        console.log(dateTwo)
        url = `http://localhost:8888/web/jsonapi/node/taak?filter[author-filter][condition][path]=uid.id&filter[author-filter][condition][value]=329d9212-855f-44b7-aee3-77c2b2e07fb5&filter[datum][condition][path]=field_datum&filter[datum][condition][operator]=BETWEEN&filter[datum][condition][value][]=${dateOne}&filter[datum][condition][value][]=${dateTwo}&fields[node--taak]=title,field_startuur,field_einduur,field_pauze,field_datum`
        getHoursData()
    }

    secondsToHours()


    return(
        <div>
            <h2>{time}</h2>
            <input 
                name="dateOne"
                type="date"
                onChange={(e) => setDateOne(e.target.value)}
            />
            <input 
                name="dateTwo"
                type="date"
                onChange={(e) => setDateTwo(e.target.value)}
            />
            <button onClick={handleSubmit}>Bekijk</button>
        </div>
    )
    
}