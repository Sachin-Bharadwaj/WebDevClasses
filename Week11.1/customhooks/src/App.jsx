import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useFetch } from "./hooks/usefetch";
import { usePrev } from "./hooks/useprev";
import { useDebounce } from "./hooks/usedebounce";

function App() {
  const [postnum, setPostnum] = useState(1);
  const [inputVal, setInputVal] = useState("");

  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/" + postnum
  );
  const prevData = usePrev(data);
  const debounceVal = useDebounce(inputVal, 200);

  function change(event) {
    setInputVal(event.target.value);
  }

  useEffect(() => {
    // expensive opeartion
    // fetch
    console.log("expensive operation");
  }, [debounceVal]);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <button onClick={() => setPostnum(1)}>1</button>
      <button onClick={() => setPostnum(2)}>2</button>
      <button onClick={() => setPostnum(3)}>3</button>
      <input onChange={change} type="text" />
      <br />
      <h3>Current data</h3>
      {JSON.stringify(data)}
      <h3>Prev data</h3>
      {JSON.stringify(prevData)}
    </>
  );
}

export default App;
