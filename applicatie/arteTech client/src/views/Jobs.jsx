import React, { useState, useEffect, Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './../css/general.css'
import './../css/period.css'
import './../css/button.css'

export default function Jobs () {

    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    let url = `http://localhost:8888/web/jsonapi/node/Periode?filter[janis-filter][condition][value]=${userId}&filter[janis-filter][condition][path]=field_klantnaam.id`

 

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
        // console.log(data.data[0].attributes);
        for(let i = 0; i<data.data.length; i++){
            let period = data.data[i].attributes;
            let periodid = data.data[i].id
            let periodtitle = period.title
            let periodstart = period.field_start_periode;
            let periodend = period.field_eind_periode;
            let periodcheck = period.field_goed_geke;
            if(periodcheck === false){
                periodcheck = "nog niet goed gekeurd";
            } else {
                periodcheck = "goed gekeurd"
            }
            document.getElementById('periodes').innerHTML += `<a href="/periode/${periodid}"><div><h1>${periodtitle}</h1><p>periode van: ${periodstart}</p><p>periode eindigd op: ${periodend}</p><p>Deze periode is <b>${periodcheck}</b></p><p>Kost <b>${period.field_kost}</b></p><p>Met een transport kost van <b>${period.field_transportkost}</b></p></div></button>`
            }
        })
    }


    useEffect(getPeriodData,[])
    



    return(
        <div className="body">
            <div id="periodes" className="periodes">
            </div>
        </div>
    )
    
}