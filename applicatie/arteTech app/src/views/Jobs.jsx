import React, { useState, useEffect, Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './../css/taak.css';
import './../css/general.css';

export default function Jobs () {
    const [hoursData, setHoursData] = useState("")
    const [dateOne, setDateOne] = useState("")
    const [dateTwo, setDateTwo] = useState("")

    console.log(dateOne)

    // const [time, setTime] = useState("")
    let hoursWork = "";
    let time = "";
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')


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
        url = `http://localhost:8888/web/jsonapi/node/taak?filter[author-filter][condition][path]=uid.id&filter[author-filter][condition][value]=${userId}&filter[datum][condition][path]=field_datum&filter[datum][condition][operator]=BETWEEN&filter[datum][condition][value][]=${dateOne}&filter[datum][condition][value][]=${dateTwo}&fields[node--taak]=title,field_startuur,field_einduur,field_pauze,field_datum`
        getHoursData()
        fetch(`http://localhost:8888/web/jsonapi/node/taak?filter[author-filter][condition][path]=uid.id&filter[author-filter][condition][value]=${userId}&filter[datum][condition][path]=field_datum&filter[datum][condition][operator]=BETWEEN&filter[datum][condition][value][]=${dateOne}&filter[datum][condition][value][]=${dateTwo}`, {
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
            document.getElementById('taken').innerHTML=""
            for(let i = 0; i<data.data.length; i++){
                document.getElementById('taken').innerHTML+= '<div class="taakbox"><h3>'+data.data[i].attributes.title+'</h3><p>klant: '+data.data[i].attributes.field_klant+'</p><p>datum: '+data.data[i].attributes.field_datum+'</p><p>Aantal km: '+data.data[i].attributes.field_transport+'</p></div>'
            }
        })
    }

    secondsToHours()

    


    return(
        <div className="body">z
            <h2 className="title">Aantal uur gewerkt: {time}</h2>
            <div className="row">
            <input
                className="input besideInput" 
                name="dateOne"
                type="date"
                onChange={(e) => setDateOne(e.target.value)}
            />
            <input 
                className="input besideInput" 
                name="dateTwo"
                type="date"
                onChange={(e) => setDateTwo(e.target.value)}
            />

            </div>
            <button className="btnColor"onClick={handleSubmit}>Bekijk</button>

            <div id="taken">
              
            </div>
        </div>
    )
    
}