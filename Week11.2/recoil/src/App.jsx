import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom, evenSelector } from "./store/atoms/counter";

function App() {
  return (
    <>
      <RecoilRoot>
        <Buttons />
        <Counter />
        <IsEven />
      </RecoilRoot>
    </>
  );
}

function Buttons() {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <div>
      <button
        onClick={() => {
          setCount((c) => c + 2);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          setCount((c) => c - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

function Counter() {
  const count = useRecoilValue(counterAtom);

  return <div>{count}</div>;
}

function IsEven() {
  const isEven = useRecoilValue(evenSelector);

  return <div>{isEven ? "Even" : "Odd"}</div>;
}

export default App;
