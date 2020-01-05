import React, { useState, useEffect, Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './../css/general.css'
import './../css/login.css'
import './../css/button.css'

export default function Login () {
  const [userName, setUserName] = useState("")
  const [userPassword, setPassword] = useState("")
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const handleSubmit = () => {
    console.log(userName);
    console.log(userPassword);
    const encodedString = new Buffer(userName + ':' + userPassword).toString('base64')
    console.log(encodedString);
    fetch("http://localhost:8888/web/jwt/token", {
      method: "POST",
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + encodedString
      },
    }).then((response) => {
      return response.json();
    }).then((data)=> {
      console.log(data.token)
      localStorage.setItem('token', data.token)
      fetch('http://localhost:8888/web/jsonapi',{
        method: "GET",
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' +  data.token
        },
      }).then((response) => {
        return response.json();
      }).then((getuser)=> {
        const userid = getuser.meta.links.me.meta.id
        localStorage.setItem('userId', userid) 
        // window.location.reload(false);
        window.location.replace("/login");

      })
    })
  }

  function getUserId(){
    const userId = localStorage.getItem('userId') 
    fetch("http://localhost:8888/web/jsonapi/user/user/" + userId + "/?include=roles", {
      method: "GET",
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      },
    }).then((response) => {
      return response.json();
    }).then((data)=> {
      try {
        const role = data.included[0].attributes.label
        localStorage.setItem('role', role)
        if(role){
          window.location.replace("/login");
        }
      }
      catch {
        return(<h1>no!</h1>)
      }
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    localStorage.removeItem('clients')
    window.location.replace("/")
  }


  if(token && !role){
    getUserId()
    return(
    <div className="body loginBody">
      <h1>Goeiedag!</h1>
      <p>U bent helaas geen gebruiker van onze applicatie! Bezoek zeker onze website!</p>
      <button className="btnColor btnLogin boxshadow"onClick={logout}>Verlaten</button>
      </div>)
  } else if (role){
    if(role !== "klant")
    return(
      <div className="body loginBody">
        <h1>Goeiedag!</h1>
        <p>U bent helaas geen gebruiker van onze applicatie! Bezoek zeker onze website!</p>
        <button className="btnColor btnLogin boxshadow"onClick={logout}>Verlaten</button>
        </div>)
  }
  else if(role == "klant" ||role == "Administrator"){
    return(
    <div>
      <h1>Welkom!</h1>
    </div>
    )
  } 
  else {
    return(
      <div className="body loginBody">
        <h1 className="title loginTitle">Login</h1>
        <div className="loginFormulier">
          <label className="loginlabel">Gebruikersnaam</label>
          <input
            className="input loginInput"
            name="username"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className="loginlabel">Wachtwoord</label>
          <input
            className="input loginInput"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className="btnColor btnLogin boxshadow"onClick={handleSubmit}>Login</button>
        </div>
      </div>
    )
  }
}