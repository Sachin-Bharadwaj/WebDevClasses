"use client";
import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router = useRouter();
  const [room, setRoom] = useState("");

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      background: "black",
      display: "flex",
      justifyContent: "center",
      justifyItems: "center"

    }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}>
        <TextInput placeholder="RoomName" onChange={(e) => {
          setRoom(e.target.value);
        }}/>
        <button onClick={() => {
          // hard coding room number for now
          router.push(`/chat/${room}`);
        }}>Join room</button>
      </div>
    </div>
  );
}
