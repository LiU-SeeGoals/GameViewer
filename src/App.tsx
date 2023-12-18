import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import Sidebar from './components/sidebar'
import GameViewer from './components/gameViewer'

function App() {
  return (
    <div className="app-container">
      <Sidebar/>
      <GameViewer/>
    </div>
  )
}

export default App
