import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <main className="main-content">
        {/* Main Heading - Responsive across all devices */}
        <h1 className="main-heading">
          This is a heading
        </h1>
        
        {/* Button Container - Layout changes based on breakpoints */}
        <div className="button-container">
          <button className="primary-button">
            THIS IS A BUTTON
          </button>
          
          {/* Second button - only visible on tablet and mobile */}
          <button className="secondary-button">
            THIS IS A BUTTON
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
