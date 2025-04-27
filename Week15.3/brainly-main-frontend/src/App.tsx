import { Dashboard } from "./pages/Dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* Todo: Add unauthenticated route to render the share brain */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
