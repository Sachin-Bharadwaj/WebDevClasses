import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [messages, setMessages] = useState<string[]>([])
  const [sendMessage, setSendMessage] = useState<string>('')

  useEffect( () => {
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
      console.log("Connected")
      setSocket(socket)
    }

    // Event listener for receiving messages
    socket.onmessage = (event) => {
      console.log('Message received:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
      
    };

    // Event listener for when the connection is closed
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Event listener for errors
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };

  }, [])

  if(!socket) {
    return <div> Connecting to WebSocket...</div>
  }

  return (
    <>
      <input type="text" onChange={(e) => {
        setSendMessage(e.target.value)
      }}/>
      <button onClick={() => {
        socket.send(sendMessage)
      }}>Send</button>
      {messages}
    </>
  )
}

export default App
