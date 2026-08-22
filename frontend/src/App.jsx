import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignupPage />}></Route>

    </Routes>
  )
}

export default App
