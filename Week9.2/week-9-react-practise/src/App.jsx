import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PostComponent  } from './post';
//import { set } from 'mongoose'

function App() {
  const [currentTab, setCurrentTab] = useState("Feed");

  useEffect(function () {
    console.log("send req to backend to get data for tab: " + currentTab);
  }, [currentTab])

  return (
    <div>
      <button onClick={() => setCurrentTab("Feed")} style={{color: currentTab == "Feed" ? "red" : "black"}}>Feed</button>
      <button onClick={() => setCurrentTab("Notifications")} style={{color: currentTab == "Notifications" ? "red" : "black"}}>Notifications</button>
      <button onClick={() => setCurrentTab("Messages")} style={{color: currentTab == "Messages" ? "red" : "black"}}>messages</button>
      <button onClick={() => setCurrentTab("Jobs")} style={{color: currentTab == "Jobs" ? "red" : "black"}}>Jobs</button>
    </div>
  )
  
}

export default App

