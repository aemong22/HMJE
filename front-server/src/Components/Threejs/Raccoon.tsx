import {Suspense, useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Raccoon() {
  return (
    <div>
      <div className='h-screen w-screen'>
        <Canvas style={{height: '100vh', width: '100vw'}}>
            <mesh scale={1} position={[0,0,0]}>
              <Suspense fallback={null}>
                <ambientLight  intensity={0.7} />
                <spotLight intensity={0.1} angle={0.1} penumbra={1} position={[10,15,10]} castShadow/>
                  <Model/>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true}/>
              </Suspense>
            </mesh>
          </Canvas>
      </div>
    </div>
  );
}

export default Raccoon;


function Model() {
  const ref = useRef<any>()
  const { nodes, materials }:any = useGLTF('/ThreeFile/raccoon.gltf')
  return (
    <group ref={ref} dispose={null}>
      <mesh geometry={nodes.Ears_low.geometry} material={materials.M_Raccoon} position={[0, 1.06, -0.13]} rotation={[Math.PI / 9, 0, 0]} />
      <mesh geometry={nodes.Tail_low.geometry} material={materials.M_Raccoon} position={[0, 1.06, -0.13]} />
      <mesh geometry={nodes.Head_low.geometry} material={materials.M_Raccoon} position={[0, 1.06, -0.13]} rotation={[Math.PI / 6, 0, 0]} />
      <mesh geometry={nodes.Suit_low.geometry} material={materials.M_Raccoon} position={[0, 1.06, -0.13]} />
      <mesh geometry={nodes.TieKnot_low.geometry} material={materials.M_Raccoon} position={[0, 1.02, 0.13]} rotation={[-0.75, 0, 0]} />
      <mesh geometry={nodes.TieTail_low.geometry} material={materials.M_Raccoon} position={[0, 1, 0.15]} rotation={[-0.42, 0, 3.13]} />
      <mesh geometry={nodes.Shirt_low.geometry} material={materials.M_Raccoon} position={[0, 1.06, -0.13]} />
      <mesh geometry={nodes.Pot_low.geometry} material={materials.M_Raccoon} position={[-0.2, 2.19, -0.1]} rotation={[-0.28, -0.07, 0.3]} />
      <mesh geometry={nodes.PiceOfDirt_low.geometry} material={materials.M_Raccoon} position={[0.19, 1.87, 0.06]} rotation={[0.62, 0.31, -0.07]} />
      <mesh geometry={nodes.SuitButton_low.geometry} material={materials.M_Raccoon} position={[0.04, 0.84, 0.25]} rotation={[-1.95, -0.15, -2.78]} />
      <mesh geometry={nodes.ButtonStich1_low.geometry} material={materials.M_Raccoon} position={[0.05, 0.85, 0.26]} rotation={[0.88, -0.58, -0.43]} />
      <mesh geometry={nodes.ButtonStich2_low.geometry} material={materials.M_Raccoon} rotation={[-1.56, -0.87, -2.57]} />
      <mesh geometry={nodes.Body_low.geometry} material={materials.M_Raccoon} position={[0, 1.06, -0.13]} />
    </group>
  )
}

