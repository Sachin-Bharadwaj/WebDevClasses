import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PostComponent  } from './post';
//import { set } from 'mongoose'

function App() {

  return (
    <div> 
      Hi there
    </div>
  )

  /* return (
    <div style={{background: "#dfe6e9", height: "100vh" }}>
      <button> Add Post </button>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div>
          <PostComponent 
          name = {"Sachin"}
          subtitle={"100 followers"}
          time={"2m ago"}
          description={"How to study in 2024"}
          image={""}
          />
          <br />

          <PostComponent 
          name = {"vishal"}
          subtitle={"200 followers"}
          time={"30m ago"}
          description={"How to earn money"}
          image={""}
          />
          <br />

          <PostComponent 
          name = {"vibha"}
          subtitle={"Promoted"}
          description={"How to meditate"}
          image={""}
          />
          <br />
          
        </div>
      </div>
    </div>
  ) */
}



export default App
