import react, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  return (
    <div>
      <ErrorBounday>
      <Card1 />
      </ErrorBounday>
      <Card2 />
    </div>
  )
}

class ErrorBounday extends react.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error){
    return { hasError: true };
  }

  ComponentDidCatch(error, errorInfo){
    console.log("Error: ", error);
    console.log("Error Info: ", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
      <div style={{background: "red", borderRadius:20, padding: 10}}>
      Something went wrong!
    </div>
      )
    }

    return this.props.children;
  }


}

function Card1() {

  throw new Error("Error while rendering");

  return (
    <div style={{background: "red", borderRadius:20, padding: 10}}>
      hi there
    </div>
  )
}

function Card2() {

  return (
    <div style={{background: "red", borderRadius:20, padding:10}}>
      hello
    </div>
  )
}

export default App
