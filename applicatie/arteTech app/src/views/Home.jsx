import React, { useState, useEffect, Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./../css/home.css";


export default function Home () {
  return(
    <h1 className={"home"}>Welkom</h1>
  )
}