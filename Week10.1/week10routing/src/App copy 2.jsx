import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useRef, useState } from 'react'

function App() {

  const inputRef = useRef(null);

  // bad way to refer to DOM element in react
  function focusOnInput() {
    document.getElementById("name").focus();
    
  }

  // better way to refer to DOM element in react
  function focusOnInput1() {
    inputRef.current.focus();
  }

  return (
    <div>
      Sign up
      <input ref={inputRef} id="name" type="text" />
      <input  type="text" />
      <button onClick={focusOnInput1}>Submit</button>

    </div>
  )
}



export default App
