import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from '@react-three/cannon';
import { Box } from '@react-three/drei';


  const D6 = (props) => {
    const radius = 1;
    const octahedronGeometry = new THREE.BoxGeometry(radius);
    const [ref, api] = useConvexPolyhedron(() => {
      return {
        args: octahedronGeometry,
        mass: 1,
        ...props,
      };
    });

    return (
      <Box
        args={radius}
        ref={ref}
        onClick={() => api.applyImpulse([0, 20, 40], [0, 0, 0])}
        castShadow
        receiveShadow
      >
        <meshNormalMaterial attach="material" />
      </Box>
    );
  };

  export default D6;




  // const materials = [
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg')}),
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg')}),
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-3.jpg')}),
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-4.jpg')}),
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-5.jpg')}),
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-6.jpg')}),
  // ];
