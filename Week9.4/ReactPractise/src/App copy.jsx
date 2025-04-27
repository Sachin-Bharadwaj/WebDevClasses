import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  return (
    <div>
      <Card>
        <h2>Card Title</h2>
        <p>This is some content inside this card</p>
      </Card>
      <Card>
        <h2>Another card</h2>
        <p>This card has other contents</p>
        <textarea ></textarea>
      </Card>
    </div>
  )
}

function Card({ children }) {

  return (
    <div style={{
      border: '1px solid black',
       borderRadius: '5px', 
       margin: '10px', 
       padding: '20px',
       boxShadow: '5px 5px 5px grey'
       }}>
      {children}
    </div>

  )
}

export default App
