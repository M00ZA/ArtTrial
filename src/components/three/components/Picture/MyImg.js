import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader'

// import { draco } from 'drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Decal, useTexture } from '@react-three/drei';

function draco(url = 'https://www.gstatic.com/draco/v1/decoders/') {
  return (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(url)
    ;(loader).setDRACOLoader(dracoLoader)
  }
}

const MyImg = ({
  url,
  scale,
  position,  
  rotation,
  metalness,
  roughness

}) => {

    const texture = useTexture(url)
    // const colorMap = useLoader(TextureLoader, url);
    // console.log(colorMap)
//     scene.traverse( function ( child ) {
//       if ( child.isMesh ) {                                     
//           child.castShadow = true;
//           child.receiveShadow = true;
//           child.material.toneMapped = false;
//           child.material.metalness = metalness;
//           child.material.roughness =roughness;
//       }
//   });
  
    return (
        //  <primitive 
        //     scale={scale} 
        //     position={position}
        //     rotation={rotation}
        //     object={scene}                    
        //     dispose={null}
        //   />
        <mesh position={position} rotation={rotation} scale={scale} dispose={null}  >
        {/* <sphereGeometry args={[1, 32, 32]} /> */}
        {/* <Decal position={position} rotation={rotation} scale={scale} dispose={null} >
        <meshStandardMaterial map={colorMap} />
        </Decal> */}
 <meshBasicMaterial map={texture} />
      <boxGeometry scale={80}  />

      </mesh>
    )
  }

  export default MyImg;
