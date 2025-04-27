import { useState, useContext, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// create context
const BulbContext = createContext();

function Bulbwrapper({ children }) {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <BulbContext.Provider value={{
      bulbOn: bulbOn,
      setBulbOn: setBulbOn
    }}>
      {children}
    </BulbContext.Provider>
  )
}

function App() {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <div>
      
      {/* One way to provide context to avoid prop drilling */}
      {/* <BulbContext.Provider value={{
        bulbOn: bulbOn,
        setBulbOn: setBulbOn
      }}>
        <LightBulb />
      </BulbContext.Provider> */}

      {/* Another way to provide context to avoid prop drilling by using wrapper component*/}
      <Bulbwrapper>
        <LightBulb />
      </Bulbwrapper>

    </div>
  )
}

function LightBulb() {
  

  return (
    <div>
      <BulbState  />
      <ToggleBulbState  />
    </div>
  )
}

function BulbState() {
  
  const { bulbOn } = useContext(BulbContext);
  return (
    <div>
      {bulbOn ? "Bulb on" : "Bulb off"}
    </div>
  )
}

function ToggleBulbState() {
  const { setBulbOn } = useContext(BulbContext);

  function toggle() {
    setBulbOn((prev) => !prev);
  }

  return (
    <div>
      <button onClick={toggle}>Toggle Bulb</button>
    </div>
  )
}

export default App
