import './App.css'
import NavBar from './LandingPage/NavBar'
import Home from './LandingPage/Home'
import UniversityDetail from './LandingPage/UniversityDetail'
import ItalyMap from './LandingPage/ItalyMap'
import UnivTable from './LandingPage/UnivTable'
import Footer from './LandingPage/Footer'
import SignIn from './LandingPage/Signin'
import Register from './LandingPage/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Landing = () => (
  <>
    <NavBar />
    <Home />
    {/* ItalyMap gets id="map" wrapper for anchor nav */}
    <div id="map">
      <ItalyMap />
    </div>
    {/* UnivTable gets id="table" wrapper */}
    <div id="table">
      <UnivTable />
    </div>
    <Footer/>
  </>
);

function App() {
  return (
    <BrowserRouter basename="/Italyst-front">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin"   element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/univ/:univSlug" element={<><NavBar /><UniversityDetail /> <Footer/></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App