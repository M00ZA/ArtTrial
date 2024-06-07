"use client"
import React, { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Stars, Sky, /* Stats */ } from "@react-three/drei";
// import Moon from '../Moon/Moon';
// import Building from '../Building/Building';
// import Ground from '../Ground/Ground';
// import Art from '../Art/Art';
// import Furniture from '../Furniture/Furniture';
// import Camera from '../Camera/Camera';
// import Player from '../Player/Player';
// import Lights from '../Lights/Lights';

// -------------------------

import dynamic from "next/dynamic";
import LandingLoader from '@/app/(website)/_components/landingLoader/landingLoader';
import { useRouter, useSearchParams } from 'next/navigation';
const Moon = dynamic(() => import('../Moon/Moon'), {
  ssr: false,
  // loading: () => <LandingLoader />,
});
const Building = dynamic(() => import('../Building/Building'), {
  ssr: false,
  // loading: () => <LandingLoader />,
});
const Ground = dynamic(() => import('../Ground/Ground'), {
  ssr: false,
  // loading: () => <LandingLoader />,
});

const Art = dynamic(() => import('../Art/Art'), {
  ssr: false,
  // loading: () => <LandingLoader />,
});
const Furniture = dynamic(() => import('../Furniture/Furniture'), {
  ssr: false,
  // loading: () => <LandingLoader />,
});

const Camera = dynamic(() => import('../Camera/Camera'), {
  ssr: false,
  // loading: () => <LandingLoader />,
});

const Player = dynamic(() => import('../Player/Player'), {
  ssr: false,
  // loading: () => <LandingLoader />,
});

const Lights = dynamic(() => import('../Lights/Lights'), {
  ssr: false,
  // loading: () => <LandingLoader />,
});


const App = () => {
  const [night, setNight] = useState(false)
  const [performance, setPerformance] = useState(true)
  const searchParams = useSearchParams()
  const id = searchParams.get('e')
  const router = useRouter()

  console.log({
    night,
    performance
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.code) {
        case "KeyN":
          setNight(!night)
          return;
        case "KeyP":
          setPerformance(!performance)
          return;
        case "KeyE":
          return router.push("/events/"+id);
        default: return;
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [night, performance])  


  return (

    <>
      <Canvas 
        onCreated={({ gl }) => { 
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <Camera fov={60} />
        
        {night ? 
          <>
            <Stars />
             <Suspense fallback={null}>
                <Moon />
             </Suspense>
            <fog attach="fog" args={["#272730", 30, 250]}/>
          </>
          : 
          <>
            <Sky sunPosition={[110, 170, -250]} /> 
            <fog attach="fog" args={["#f0f4f5", 30, 250]}/>
          </>
        }

        <Lights 
          night={night}
          performance={performance}
        />
             
        {/* <Physics gravity={[0, -30, 0]}>
          <Suspense fallback={null}>
            <Ground /> 
            <Building />            
            <Art />  
            <Furniture />               
          </Suspense>      
          <Player />       
        </Physics> */}
         <Physics gravity={[0, -30, 0]}>
          <Suspense fallback={null}>
            <Ground /> 
            <Building />            
            <Art  />  
            <Furniture />               
          </Suspense>      
          <Player />    
        </Physics>
        {/* <Stats  showPanel={0} /> */}
      </Canvas>
    </>
  );
}

export default App;



