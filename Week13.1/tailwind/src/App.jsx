import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Buttons } from "./components/Buttons";
import { Input } from "./components/Input";
import { Otp } from "./components/otp";

function App() {
  return (
    <>
      <div className="h-screen bg-blue-700">
        <br /> <br /> <br />
        <Input type={"text"} placeholder={"Username"} />
        <Buttons disabled={true}>Signup</Buttons>
        <Otp />
      </div>
    </>
  );
}

export default App;
