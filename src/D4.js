import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from '@react-three/cannon';
import { Tetrahedron } from '@react-three/drei';

  const D4 = (props) => {

    console.log('hello');
    const radius = 1;
    const octahedronGeometry = new THREE.TetrahedronGeometry(radius);
    const [ref, api] = useConvexPolyhedron(() => {
      return {
        args: octahedronGeometry,
        mass: 1,
        ...props,
      };
    });
    console.log(ref, api, 'are these triggering');

    return (
      <Tetrahedron
        args={radius}
        ref={ref}
        onClick={() => api.applyImpulse([0, 20, 40], [0, 0, 0])}
        castShadow
        receiveShadow
      >
        <meshNormalMaterial attach="material" />
      </Tetrahedron>
    );
  };

  export default D4;
