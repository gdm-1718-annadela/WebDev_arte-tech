import React, { useState, useEffect, Component} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './../css/taak.css';
import './../css/general.css';

export default function Taak () {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const [clientName, setClientName] = useState("")
  const [taskName, setTaskName] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [finalTime, setFinalTime] = useState("")
  const [breakTime, setBreakTime] = useState("")
  const [executed, setExecuted] = useState("")
  const [used, setUsed] = useState("")
  const [transport, setTransport] = useState("")  

  let options = []

  function getClients (){
    fetch('http://localhost:8888/web/jsonapi/user/user', {
      method: "GET",
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' +  token
      },
    }).then((response) => {
      return response.json();
    }).then((data)=> {
      for(let i = 0; i < data.data.length ; i++){
        let roles = data.data[i].relationships
        if (roles){
          let rolesId = roles.roles.data[0].id
          if (rolesId == "5cf72a3c-f224-4234-aad8-0bb78c1c56cc"){
            let nameClient = data.data[i].attributes.name
            options.push(nameClient)
          }
        }
        localStorage.setItem('clients', JSON.stringify(options))
      }
    })
  }




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
                        "id": userId
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
      <div className="body">
        <h1>Vul in</h1>
        <label>Klant</label>
        <select className="boxshadow" id="clientName">
        {
                klanten.map(function (option) {
                    return (<option key={option} value={option }>{option}</option>)
                })
            }
        </select>
        <label>Taak</label>
        <input
          className="input"
          name="taskName"
          type="text"
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label>Datum</label>
        <input
          className="input"
          name="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Gestart om</label>
        <input
          className="input"
          name="startTime"
          type="time"
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>Gestopt om</label>
        <input
          className="input"
          name="finalTime"
          type="time"
          onChange={(e) => setFinalTime(e.target.value)}

        />

        <label>Pauze tijd in minuten</label>
        <input
          className="input"
          name="breakTime"
          type="number"
          onChange={(e) => setBreakTime(e.target.value)}
        />

        <label>Uitgevoerde activiteit(en)</label>
        <input
          className="input"
          name="executed"
          type="textarea"
          onChange={(e) => setExecuted(e.target.value)}
        />

        <label>Gebruikt materiaal</label>
        <input
          className="input"
          name="used"
          type="textarea"
          onChange={(e) => setUsed(e.target.value)}
        />

        <label>Transport in km</label>
        <input
          className="input"
          name="transport"
          type="number"
          onChange={(e) => setTransport(e.target.value)}
        />
        <button className="btnColor" onClick={handleSubmit}>Plaats Taak</button>
      </div>
    )  
  } else {
    getClients()

    localStorage.getItem('clients')
    return(<h1>Hi</h1>)
  }    
}