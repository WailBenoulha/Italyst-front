import './App.css'
import NavBar from './LandingPage/NavBar'
import Home from './LandingPage/Home'
import UniversityDetail from './LandingPage/UniversityDetail'
import ItalyMap from './LandingPage/ItalyMap'
import UnivTable from './LandingPage/UnivTable'
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
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/univ/:univSlug" element={<><NavBar /><UniversityDetail /></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App