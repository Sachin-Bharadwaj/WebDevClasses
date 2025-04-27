"use client"
import { useState } from "react";
import axios from "axios"

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
            <div className="border p-2 flex flex-col">
                <input className="text-black m-2 p-2" type="text" placeholder="username" onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <input className="text-black m-2 p-2" type="password" placeholder="password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <button className="bg-purple-700 m-2 p-2 rounded-l w-48" onClick={() => {
                    axios.post("", {
                        username,
                        password
                    })
                }}>Signin</button>
            </div>
        </div>
    )
}