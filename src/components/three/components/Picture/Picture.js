import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { draco } from 'drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

function draco(url = 'https://www.gstatic.com/draco/v1/decoders/') {
  return (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(url)
    ;(loader).setDRACOLoader(dracoLoader)
  }
}

const Picture = ({
  url,
  scale,
  position,  
  rotation,
  metalness,
  roughness

}) => {
    const { scene } = useLoader(GLTFLoader, url, draco("https://www.gstatic.com/draco/versioned/decoders/1.4.0/"));
    scene.traverse( function ( child ) {
      if ( child.isMesh ) {                                     
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.toneMapped = false;
          child.material.metalness = metalness;
          child.material.roughness =roughness;
      }
  });
  
    return (
         <primitive 
            scale={scale} 
            position={position}
            rotation={rotation}
            object={scene}                    
            dispose={null}
          />
    )
  }

  export default Picture;
