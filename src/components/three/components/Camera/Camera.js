import React, { useRef, useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';

const Camera = (props) => {
    // const ref = useRef();
    // // const { setDefaultCamera } = useThree();
    // const setDefaultCamera = useThree(({ set }) => set)

    
    // useEffect(() => {
    //     setDefaultCamera(ref.current)
    // }, [setDefaultCamera])
    const cameraRef = useRef()
    const set = useThree(({ set }) => set)
    // const size = useThree(({ size }) => size)
    
    // useLayoutEffect(() => {
    //     if (cameraRef.current) {
    //       cameraRef.current.aspect = size.width / size.height
    //       cameraRef.current.updateProjectionMatrix()
    //     }
    //   }, [size, props])
    
      useLayoutEffect(() => {
        set({ camera: cameraRef.current })
      }, [])

    return (
        <perspectiveCamera ref={cameraRef} {...props} />
    )
}

export default Camera;