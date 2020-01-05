import React, { useState, useEffect, Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";





export default function User () {
  const [userPicture, setUserPicture] = useState("")
  const [userDate, setUserDate] = useState("")
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  
  function getUserData(){
    fetch('http://localhost:8888/web/jsonapi/user/user/'+userId+'/?include=user_picture', {
    method: "GET",
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' +  token
    },
  }).then((response) => {
    return response.json();
  }).then((data)=> {
    console.log(data)
    setUserPicture(data.included[0].attributes.uri.url)
    setUserDate(data.data.attributes)
  })
  }

  const handlelogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    localStorage.removeItem('clients')
    window.location.replace("/")
  }

  useEffect(getUserData,[])
  
  if(localStorage.getItem('token')){
    console.log(userDate)
    return(
      <div className="body loginBody">
        <div className="account">
        <div className = "UserPicture"><img src={'http://localhost:8888'+ userPicture}/></div>
        <h1 className="title">Hi {userDate.name}</h1>
        </div>
        <button  className = "btnOrange"onClick={handlelogout}>UitLoggen</button>
      </div>
    )
  } else {
    return(
      <h2>Not Logged In</h2>
    )
  }
}