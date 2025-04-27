"use client"
import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
            <div className="border p-2 flex flex-col">
                <input className="text-black m-2 p-2" type="text" placeholder="username" onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <input className="text-black m-2 p-2" type="password" placeholder="password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <button className="bg-purple-700 m-2 p-2 rounded-l w-48" onClick={async () => {
                    await axios.post("http://localhost:3000/api/v1/signup", {
                        username,
                        password
                    });
                    // move to sign-in
                    router.push("/signin")
                }}>Signup</button>
            </div>
        </div>
    )
}