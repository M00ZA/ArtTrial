import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useBox } from "@react-three/cannon";
// import { draco } from 'drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

function draco(url = 'https://www.gstatic.com/draco/v1/decoders/') {
  return (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(url)
    ;(loader).setDRACOLoader(dracoLoader)
  }
}

const Bench = ({
  url,
  scale,
  position,
  rotation,
  physicsSize,
  physicsPosition,

}) => {
    const [ref] = useBox(() => ({
        type: "static",
        args: physicsSize,
        position: physicsPosition
     }))

    const { scene } = useLoader(GLTFLoader, url, draco("https://www.gstatic.com/draco/versioned/decoders/1.4.0/"));

    scene.traverse( function ( child ) {
      if ( child.isMesh ) {                                     
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.toneMapped = false;
          child.material.metalness = 0.1;
          child.material.roughness = 1;
          child.material.clearcoat= 0.9;
          child.material.clearcoatRoughness= 0.1;
      }
  });
   
    return (  
            <>
              <mesh ref={ref}/>
              <primitive
                  scale={scale}                
                  position={position}
                  rotation={rotation}
                  object={scene}
                  dispose={null}
              />
            </> 
    );
}

export default Bench;