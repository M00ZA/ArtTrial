import React, { useEffect, useRef } from 'react';
import { extend, useThree } from '@react-three/fiber';
import { PointerLockControls as PointerLockControlsExt } from 'three/examples/jsm/controls/PointerLockControls';

extend({ PointerLockControlsExt })

const PointerLockControls = (props) => {
    const { camera, gl } = useThree()
    const controls = useRef()

    useEffect(() => {
        function onClick(){
            if(controls?.current&& controls?.current?.lock){
                controls?.current?.lock()
            }
        }

        document.addEventListener("click", onClick);
        return () => {
          document.removeEventListener("click", onClick);
        };
    }, [])

    return (
        <pointerLockControlsExt
            ref={controls}
            args={[camera, gl.domElement]}
            {...props}
        />
    )
}

export default PointerLockControls