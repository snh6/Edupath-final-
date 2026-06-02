import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import CollegeDetail from './pages/CollegeDetail'
import './index.css'
 
function App() {
  const isLoggedIn = () => {
    return localStorage.getItem('token') !== null
  }
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={isLoggedIn() ? <Home /> : <Navigate to="/" />} />
        <Route path="/quiz" element={isLoggedIn() ? <Quiz /> : <Navigate to="/" />} />
        <Route path="/results" element={isLoggedIn() ? <Results /> : <Navigate to="/" />} />
        <Route path="/college/:name" element={isLoggedIn() ? <CollegeDetail /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
 
export default App
