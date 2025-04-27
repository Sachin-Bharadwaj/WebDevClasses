import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useRef, useState } from 'react'

function App() {
  // a clock with a start and stop button
  const [currentCount, setCurrentCount] = useState(0);
  
  // create reference to timer obj using useRef hook
  // it stores the reference and does not change across re-renders (persists across re-renders)
  let timer = useRef(null);

  function startClock() {
    let value = setInterval(() => {
      setCurrentCount((prevCount) => prevCount + 1);
    }, 1000);
    timer.current = value;
  }

  function stopClock() {
    clearInterval(timer.current);
  }

  return (
    <div>
      {currentCount} <br />
      <button onClick={startClock}>Start</button>
      <button onClick={stopClock}>Stop</button>
    </div>
  )
}



export default App
