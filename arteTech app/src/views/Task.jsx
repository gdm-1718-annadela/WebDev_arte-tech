import React, { useState, useEffect, Component} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


export default function Taak () {
  const token = localStorage.getItem('token')
  const [clientName, setClientName] = useState("")
  const [taskName, setTaskName] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [finalTime, setFinalTime] = useState("")
  const [breakTime, setBreakTime] = useState("")
  const [executed, setExecuted] = useState("")
  const [used, setUsed] = useState("")
  const [transport, setTransport] = useState("")  

  function timeToSeconds(time, whatTime){
    let splittedTime = time.split(":")
    let hour = splittedTime[0] * 3600
    let min = splittedTime[1] * 60
    let seconds = hour + min
    if(whatTime == "starttime"){
      setStartTime(seconds)
    } else if(whatTime == "finaltime"){
      setFinalTime(seconds)
    }
  }
  
  const handleSubmit = () => {
    let client = document.getElementById("clientName");
    let strUser = client.options[client.selectedIndex].value;
    {setClientName(strUser)}
    timeToSeconds(startTime, "starttime")
    timeToSeconds(finalTime, "finaltime")
  }

  if(clientName == ""){
    console.log("oops")
  } else {
    console.log(clientName)
    console.log("yeey !!!")
    getTaskData()
    return(<Redirect to='/login' />)
  }


  function getTaskData(){
    fetch('http://localhost:8888/web/jsonapi/node/taak', {
      method: "POST",
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' +  token,
        'X-CSRF-Token': 'KTpytkazFcgdgLqK33HpYx4YFb3w3a5olURFx2uAEXs'
      },
      body: JSON.stringify({
              "data": {
                "type": "node--taak",
                "attributes": {
                  "title": taskName,
                  "field_klant": clientName,
                  "field_datum": date,
                  "field_startuur": startTime,
                  "field_einduur": finalTime,
                  "field_pauze": breakTime,
                  "field_uitgevoerde_activiteiten": executed,
                  "field_materialen": used,
                  "field_transport": transport
                },
                "relationships": {
                  "field_test": {
                    "data": {
                        "type": "user--user",
                        "id": "1911bb31-c14f-4cc1-90a3-994db5e4a59c"
                    },
                  }
                }
              }
            })
    }).then((response) => {
      return response.json();
    }).then((data)=> {
      console.log(data)      
    })
  }

  if(localStorage.getItem("clients")) {
    let klanten = JSON.parse(localStorage.getItem('clients'))
    return(
      <div>
        <h1>Vul in</h1>
        <select id="clientName">
        {
                klanten.map(function (option) {
                    return (<option key={option} value={option }>{option}</option>)
                })
            }
        </select>
        <label>Taak</label>
        <input
          name="taskName"
          type="text"
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label>Datum</label>
        <input
          name="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Gestart om</label>
        <input
          name="startTime"
          type="time"
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>Gestopt om</label>
        <input
          name="finalTime"
          type="time"
          onChange={(e) => setFinalTime(e.target.value)}

        />

        <label>Pauze tijd</label>
        <input
          name="breakTime"
          type="number"
          onChange={(e) => setBreakTime(e.target.value)}
        />

        <label>Uitgevoerde activiteit(en)</label>
        <input
          name="executed"
          type="textarea"
          onChange={(e) => setExecuted(e.target.value)}
        />

        <label>Gebruikt materiaal</label>
        <input
          name="used"
          type="textarea"
          onChange={(e) => setUsed(e.target.value)}
        />

        <label>Transport</label>
        <input
          name="transport"
          type="number"
          onChange={(e) => setTransport(e.target.value)}
        />
        <button onClick={handleSubmit}>Plaats Taak</button>
      </div>
    )  
  } else {
    localStorage.getItem('clients')
    return(<h1>Hi</h1>)
  }    
}