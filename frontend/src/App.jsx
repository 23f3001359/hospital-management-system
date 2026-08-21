import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LoginPage from './pages/LoginPage'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />}></Route>
    </Routes>
  )
}

export default App
