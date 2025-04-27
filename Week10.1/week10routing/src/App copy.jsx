import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

function Layout() {
  return (
    <div style={{height: "100vh"}}>
      <span>
        <Link to="/" style={{padding:10}}>Home</Link>
        <Link to="/about" style={{padding:10}}>About</Link>
        <Link to="/contact" style={{padding:10}}>Contact</Link>
      </span>
      <div style={{height: "90vh"}}> 
      <Outlet />
      </div>
      
      <h3>Footer | Contact Us</h3>
    </div>
  )

}

function ErrorPage() {
  return (
    <div>Sorry, Page not found!</div>
  )
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  )
} 

function Contact() {
  const Navigate = useNavigate();

  function redirectUser() {
    Navigate("/");
  }

  return (
    <div>
      <h1>Contact</h1>
      <button onClick={redirectUser}>Go back to Home</button>
    </div>
  )
}

export default App
