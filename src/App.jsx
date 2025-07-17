import { useState } from 'react'
import Navbar from './components/Home/Navbar.jsx'
import MainLandingPage from './components/Home/MainLandingPage.jsx'
import AboutMe from './components/Home/AboutMe.jsx'
import ContactDetails from './components/Home/ContactDetails.jsx'
import Project from './components/Home/Project.jsx'
import Skills from './components/Home/Skills.jsx'

function App() {
  return (
    <>
    <Navbar/>
    <MainLandingPage/>
    <AboutMe/>
    <Skills/>
    <Project/>
    <ContactDetails/>
    </>
  )
}

export default App
