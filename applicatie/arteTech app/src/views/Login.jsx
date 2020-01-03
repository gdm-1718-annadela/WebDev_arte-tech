import React, { useState, useEffect, Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


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
      }
      catch {
        return(<h1>no!</h1>)
      }
    })
  }

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
        window.location.replace("/login");
      }
    })
  }

  const handlelogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    localStorage.removeItem('clients')
    window.location.replace("/login")
  }


  if(token && !role){
    getUserId()
    getClients()
    return(<h1>OHNO</h1>)
  } else if(role == "medewerker" || role == "Administrator"){
    return(
    <div>
      <h1>Welkom!</h1>
      <button onClick={handlelogout}>UitLoggen</button>
    </div>
    )
  } 
  else {
    return(
      <div>
        <h1>Login</h1>
        <label>Gebruikersnaam</label>
        <input
          name="username"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Gebruikersnaam</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleSubmit}>Login</button>
      </div>
    )
  }
}