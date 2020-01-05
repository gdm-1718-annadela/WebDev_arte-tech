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


export default function Home () {
  if(localStorage.getItem('role')){

  return(
    <div className="welkomTitle">
      <h2>Welkom bij</h2>
      <h1>Arte-tech</h1>
    </div>
  )
  }else {
    return(
      <div className="welkomTitle">
        <h2>Welkom bij</h2>
        <h1>Arte-tech</h1>
      <a className="btnOrange" href="/login">Login</a>
      </div>
    )
  }
}