import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Physics, useBox, usePlane, useSphere, useConvexPolyhedron } from '@react-three/cannon'
import niceColors from 'nice-color-palettes'
import './styles.css'
// import { useConvexPolyhedron } from '@react-three/cannon';
import { Tetrahedron, RoundedBox } from '@react-three/drei';
// import D8 from './D8.js'
// import D4 from './D4.js'
// import D6 from './D6.js'
// import D10 from './D10.js'
// import D12 from './D12.js'
// import D20 from './D20.js'
import { TestDice } from './TestDice.js'


// function Bauble({ vec = new THREE.Vector3(), ...props }) {
//   const { nodes } = useGLTF("/cap.glb")
//   const [ref, api] = useCompoundBody(() => ({
//     ...props,
//     shapes: [
//       { type: "Box", position: [0, 0, 1.2 * props.args], args: new THREE.Vector3().setScalar(props.args * 0.4).toArray() },
//       { type: "Sphere", args: props.args },
//     ],
//   }))
//   useEffect(() => api.position.subscribe((p) => api.applyForce(vec.set(...p).normalize().multiplyScalar(-props.args * 35).toArray(), [0, 0, 0])), [api]) // prettier-ignore
//   return (
//     <group ref={ref} dispose={null}>
//       <mesh scale={props.args} geometry={sphereGeometry} material={baubleMaterial} />
//       <mesh scale={2.5 * props.args} position={[0, 0, -1.8 * props.args]} geometry={nodes.Mesh_1.geometry} material={capMaterial} />
//     </group>
//   )
// }



const DiceOverview = (props) => {
  const { setDiceObject, diceObject } = props;

  var cheese;


  function Plane({ color, ...props }) {
    const [ref, api] = usePlane(() => ({ ...props }))
    console.log(ref, 'useplane');
    return (
      <mesh ref={ref} receiveShadow >
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshPhongMaterial attach="material" color={color} />
      </mesh>
    )
  }


  function Box() {
    const [ref, api] = useBox(() => ({ mass: 1, args: [4, 4, 4], isKinematic: true }))
    useFrame(state => {
      const t = state.clock.getElapsedTime()
    })
    return (
      <mesh ref={ref} castShadow receiveShadow onClick={() => api.applyImpulse([0, 20, 40], [0, 0, 0])}>
        <boxBufferGeometry attach="geometry" args={[4, 4, 4]} />
        <meshLambertMaterial attach="material" color={'#3F00FF'} side={THREE.DoubleSide} />
      </mesh>
    )
  }

  function Sphere() {
    const [ref, api] = useSphere(() => ({ mass: 1, args: [1], isKinematic: true }))
    console.log(ref, api, 'sphere ref');
    return (
      <mesh ref={ref} castShadow receiveShadow onClick={() => api.applyImpulse([0, 20, 40], [0, 0, 0])}>
        <sphereBufferGeometry attach="geometry" args={[1]} />
        <meshLambertMaterial attach="material" color={'#3F00FF'} side={THREE.DoubleSide} />
      </mesh>
    )
  }


  const D4 = (props) => {
    console.log(props, 'what is D4 getting?')
    console.log(Tetrahedron, 'this is tetrahedron');
    console.log('hello');
    const radius = 1;
    const tetrahedronGeometry = new THREE.TetrahedronGeometry(radius);
    const [ref, api] = useSphere(() => {
      return {
        args: [1],
        mass: 1,
        ...props,
      };
    });


    return (
      <mesh ref={ref} castShadow geometry={tetrahedronGeometry} receiveShadow onClick={() => api.applyImpulse([0, 20, 40], [0, 0, 0])}>
        <tetrahedronBufferGeometry attach="geometry" args={[1]} />
        <meshLambertMaterial attach="material" color={'#3F00FF'} side={THREE.DoubleSide} />
      </mesh>

    );
  };

  // const [ref] = useConvexPolyhedron(() => ({ mass: 100, ...props, args: geo }))
  // return (
  //   <mesh castShadow receiveShadow ref={ref} geometry={geo} {...props} dispose={null}>
  //     <meshStandardMaterial attach="material" wireframe />
  //   </mesh>
  // )



  const Dtest = (props) => {


    return (
      <RoundedBox
        args={[1, 1, 1]} // Width, Height and Depth of the box
        radius={0.05} // Border-Radius of the box
        smoothness={4} // Optional, number of subdivisions
        position={[0, 0, 10]}
      >
        <meshPhongMaterial attach="material" color="#f3f3f3" wireframe />
      </RoundedBox>

    );
  };

  let dice4 = []
  for (var i = 0; i < props.d4; i++) {
    dice4.push(<D4 position={[2, 2, (5 * (i + 1))]} rotation={[0, 1, 0]} />)
  }


  let dice6 = []
  for (var i = 0; i < props.d6; i++) {
    dice6.push(<D6 position={[3, 3, (5 * (i + 1))]} rotation={[0, 1, 0]} />)
  }


  let dice8 = []
  for (var i = 0; i < props.d8; i++) {
    dice8.push(<D8 position={[1, 1, (5 * (i + 1))]} rotation={[0, 1, 0]} />)
  }

  let dice10 = []
  for (var i = 0; i < props.d10; i++) {
    dice10.push(<D10 position={[5, 5, (5 * (i + 1))]} rotation={[0, 1, 0]} />)
  }

  let dice12 = []
  for (var i = 0; i < props.d12; i++) {
    dice12.push(<D12 position={[-1, -1, (5 * (i + 1))]} rotation={[0, 1, 0]} />)
  }

  let dice20 = []
  for (var i = 0; i < props.d20; i++) {
    dice20.push(<D20 position={[0, 0, (5 * (i + 1))]} rotation={[0, 1, 0]} />)
  }


  const glProps = { alpha: false };
  const cameraProps = { position: [0, -12, 16] };
  // let keys = Object.keys(props)

  // console.log('what is this color', niceColors[10][4])
  return (
    <>
      <button onClick={() => { console.log('click') }}>button</button>
      <button>toss</button>
      <TestDice />
      <div style={{ position: "relative", width: 500, height: 500 }}>
        <Canvas id="myCanvas" concurrent shadowMap sRGB gl={glProps} camera={cameraProps} width={100}>
          <hemisphereLight intensity={0.35} />
          <spotLight position={[30, 0, 30]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize-width={256} shadow-mapSize-height={256} />
          <pointLight position={[-30, 0, -30]} intensity={0.5} />

          <Physics className='physics' gravity={[0, 0, -60]}>
            <Plane color={niceColors[10][4]} />
            <Plane color={niceColors[10][1]} position={[-6, 0, 0]} rotation={[0, 0.9, 0]} />
            <Plane color={niceColors[10][2]} position={[6, 0, 0]} rotation={[0, -0.9, 0]} />
            <Plane color={niceColors[10][3]} position={[0, 6, 0]} rotation={[0.9, 0, 0]} />
            <Plane color={niceColors[10][0]} position={[0, -6, 0]} rotation={[-0.9, 0, 0]} />

            <D4 position={[-4, 0, 10]} rotation={[0, 1, 0]} />

            <Dtest />
            {/* {promise} */}
            <Sphere />
            <Box />
          </Physics>
        </Canvas>
      </div>
    </>
  );
};

export default DiceOverview;

