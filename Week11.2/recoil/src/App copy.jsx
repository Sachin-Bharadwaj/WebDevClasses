import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atoms/counter";

function App() {
  return (
    <>
      <RecoilRoot>
        <Counter />
      </RecoilRoot>
    </>
  );
}

function Increase() {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <div>
      <button onClick={() => setCount((preval) => preval + 1)}>Increase</button>
    </div>
  );
}

function Decrease() {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <div>
      <button onClick={() => setCount((preval) => preval - 1)}>Decrease</button>
    </div>
  );
}

function Counter() {
  const count = useRecoilValue(counterAtom);

  return (
    <div>
      {count}
      <Increase />
      <Decrease />
    </div>
  );
}

export default App;
