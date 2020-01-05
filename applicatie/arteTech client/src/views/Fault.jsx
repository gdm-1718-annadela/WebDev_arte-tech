import React, { useState, useEffect, Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './../css/general.css'
import './../css/home.css'
import './../css/button.css'
import './../css/login.css'

export default function Fault () {
    const token = localStorage.getItem('token')
    const [message, setmessage] = useState("")

    function handleSubmit(){

    
    fetch('http://localhost:8888/web/jsonapi/node/fout', {
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
                  "title": "foutmelding",
                  "field_aanvraag": message,
                },
              }
            })
  }).then((response) => {
    return response.json();
  }).then((data)=> {
    console.log(data)
  })
}
  return(
      <div class="loginBody">
      <h1>Foutmelding</h1>
      <input
                className="input commentblock"
                name="message"
                type="text"
                onChange={(e) => setmessage(e.target.value)}
            />
        <button className="btnColor" onClick={handleSubmit}>Verstuur</button>

      </div>
  )
}