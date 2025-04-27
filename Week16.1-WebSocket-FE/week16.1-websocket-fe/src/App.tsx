
import './App.css'
import { useEffect, useState, useRef } from 'react'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const inputRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    setSocket(ws);

    /* // on error callback
    ws.onerror = () => {

    }

    // connection close callback
    ws.close = () => {

    }

    // connection open
    ws.onopen = () => {

    } */

    // evt for message from server
    ws.onmessage = (evt) => {
      alert(evt.data);
    }



  }, [])
  
  function sendMessage() {
    if(!socket){
      console.log("socket is null");
      return
    }
    socket?.send(inputRef.current.value);
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder='message...'/>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
