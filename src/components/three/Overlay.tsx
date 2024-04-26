"use client"
import React, { useState, useEffect } from "react"
// import './style/css/index.css';
import App from './components/App/App';
import Loading from './components/Loading/Loading';

 const Overlay = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const handleLockchange = () => {
      if(document.pointerLockElement === null) {
          setReady(false)        
      } else {
          setReady(true)
      }
    }
    
    document.addEventListener("pointerlockchange", handleLockchange);
    return () => {
      document.removeEventListener("pointerlockchange", handleLockchange)
    }
  })  

  return (
    <>
      <App  />
      <div className={ready ? "" : "overlay"}>
        <div className={"start"}>Click to Explore</div>
        <img className={ready ? "" : "controlsL"} src="./assets/Images/ControlsL.png" alt="Move: WASD	Jump: SPACE Run: SHIFT"></img>
        <img className={ready ? "" : "controlsR"} src="./assets/Images/ControlsR.png" alt="Look: MOUSE"></img>
        <img className={ready ? "" : "controlsTR"} src="./assets/Images/ControlsTR.png" alt="Toggle Performance: P Toggle Night Mode: N"></img>
      </div>
      <div className="dot" 
      style={{ pointerEvents: ready ? "none" : "all" }} 
      />
      <Loading />
      </>
  )
}


export default Overlay