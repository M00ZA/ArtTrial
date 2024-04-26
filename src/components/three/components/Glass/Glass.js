import React from 'react';
import * as THREE from 'three';
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


const Glass = ({
    scale,
    position,
    rotation,
    url
 }) => {
    const { scene } = useLoader(GLTFLoader, url, draco("https://www.gstatic.com/draco/versioned/decoders/1.4.0/"));
    const newMaterial = new THREE.MeshPhysicalMaterial({
        color: "skyblue"
      });

      scene.traverse( function ( child ) {
        if ( child.isMesh ) {   
            child.material = newMaterial;
            child.material.transparent = true;
            child.material.opacity = 0.2; 
            child.material.clearcoat = 1; 
            child.material.roughness = 0;
            child.material.metalness = 1;
        }
    })
  
    return (        
        <primitive 
            renderOrder={1}
            scale={scale}
            position={position}
            rotation={rotation}
            object={scene}
            dispose={null}
        /> 
    );
  }

  export default Glass;