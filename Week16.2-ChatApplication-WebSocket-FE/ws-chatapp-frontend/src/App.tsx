import { useEffect, useState, useRef } from 'react';
import './App.css'



function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const textRef = useRef<HTMLInputElement>(null);
  const socRef = useRef<WebSocket>();

  useEffect(() => {
    // create connection to web socket server
    const ws = new WebSocket("ws://localhost:8082");

    // register handler for receiving event from websocket server
    ws.onmessage = (event) => {
      setMessages(m => [...m, JSON.parse(event.data).payload.message]);
    }
    
    // store ws client object
    socRef.current = ws;

    // register for onopen event to join the room (roomId hard coded)
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

    // cleanup
    return () => {
      ws.close()
    }
    
  }, []);
  
  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="h-[95vh]">
        < br/> < br/>
        {messages.map((message, index) => 
          <div key={index} className="bg-white text-black rounded p-4 m-4">{message}</div>
        )}
      </div>
      <div className='flex'>
        <input ref={textRef} type="text" className="w-full m-1 p-1"></input>
        <button onClick={() => {
          socRef.current?.send(JSON.stringify({
            type: "chat",
            payload: {
              message: textRef.current?.value
            }
          }));
          if (textRef.current) {
            textRef.current.value = "";
          }
        }} className='bg-purple-600 m-1 p-1 rounded  text-white'>Send</button>
      </div>
    </div>
  );
}

export default App
