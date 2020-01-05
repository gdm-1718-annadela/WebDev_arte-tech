import React, { useState, useEffect, Component } from 'react';

import ReactDOM from 'react-dom';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import * as jsPDF from 'jspdf'

import './../css/general.css'
import './../css/button.css'
import './../css/period.css'

export default function Period ({match}) {

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [periodstart, setperiodstart] = useState("")
    const [periodend, setperiodend] = useState("")
    const [title, settitle] = useState("")
    const [taskdata, settaskdata] = useState("")
    const [message, setmessage] = useState("")




    let url = `http://localhost:8888/web/jsonapi/node/Periode?filter[janis-filter][condition][value]=${match.params.id}&filter[janis-filter][condition][path]=id`

    function getPeriodData(){

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
            let dates = data.data[0]
            settitle(dates.attributes.title)
            // setperiodstart(dates.attributes.field_eind_periode);
            // setperiodend(dates.attributes.field_start_periode);


    fetch(`http://localhost:8888/web/jsonapi/node/taak?filter[datum][condition][path]=field_datum&filter[datum][condition][operator]=BETWEEN&filter[datum][condition][value][]=${dates.attributes.field_eind_periode}&filter[datum][condition][value][]=${dates.attributes.field_start_periode}&filter[klant][condition][path]=field_test.id&filter[klant][condition][value]=${userId}`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' +  token
      },
  }).then((response)=> {
      return response.json()
  }).then((data)=> {
    console.log('chic')

    console.log(data)
      document.getElementById('tasks').innerHTML = "";
      for(let i = 0; i<data.data.length; i++){
          console.log(data.data[i])
          document.getElementById('tasks').innerHTML += `<div><h1>${data.data[i].attributes.title}</h1><p>${data.data[i].attributes.field_datum}</p><p>${data.data[i].attributes.field_uitgevoerde_activiteiten}</p></div>`
          settaskdata(data)
        }
      })
    })
  }

    useEffect(getPeriodData,[])

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

function goedkeuring(){
    fetch('http://localhost:8888/web/jsonapi/node/Periode/'+match.params.id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' +  token,
            'X-CSRF-Token': 'KTpytkazFcgdgLqK33HpYx4YFb3w3a5olURFx2uAEXs'
          },
          body: JSON.stringify({
                "data": 
                   {
                       "type": "node--periode",
                       "id": match.params.id,
                       "attributes": {
                           "field_goed_geke": true
                       }
                   }
                })
      }).then((response) => {
        return response.json();
      }).then((data)=> {
        console.log(data)
      })
}
 
    function hours(seconds){
      let min = seconds / 60;
      let restmin = min%60;
      let hour = min / 60 - restmin;
      return (`${hour}:${restmin}`)
    }

    function downloadPDF(){


      console.log(taskdata)
      
        var doc = new jsPDF({
          })

          for(let i = 0; i<taskdata.data.length; i++){
            console.log(taskdata.data[i].attributes)
            let data = taskdata.data[i].attributes
            doc.text('taak: ' +data.title, 10,10 )
            doc.text('datum: ' +data.field_datum, 110,10 )
            doc.text('werknemer begonnen om: ' +hours(data.field_startuur), 10,20 )
            doc.text('werknemer gestopt om: ' +hours(data.field_einduur), 10,30 )
            doc.text('werknemer heeft ' +data.field_pauze + 'minuten gepauzeerd', 100,20 )
            doc.addPage();

            // doc.text(data.field_startuur, 10,30)
            // doc.text(data.field_einduur, 10,40)

          }
          
    

          doc.save(`periode-${title}.pdf`)
    }
    
    
       return (
           <div>
           
          <div className="taskbody"id="tasks" >
          </div>    
          <div className="goedGekeurd">
            <div className="commentblock">
            <input
                className="input commentblock"
                name="message"
                type="text"
                onChange={(e) => setmessage(e.target.value)}
            />
            <button className="btnColor"onClick={handleSubmit}>Verzend probleem</button>

            <button className="btnColor" onClick={goedkeuring}>Goedgekeurd</button>
            <button className="btnColor" onClick={downloadPDF}>Download Pdf</button>

            </div>

               </div>
          </div>
        );
}

