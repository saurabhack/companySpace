import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Navbar from './component/Navbar'
import FooterSection from './component/FooterSection'
import {Outlet} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-16"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet/>
        </div>
      </div>
    </div>
    <FooterSection/>
    </>
  )
}

export default App
