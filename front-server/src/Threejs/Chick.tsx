import {Suspense, useRef, useState} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

function Chick() {
  return (
    <div>
      <div className='h-screen w-screen'>
        <Canvas style={{height: '100vh', width: '100vw'}}>
          <mesh scale={1} position={[0,0,0]}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.1} />
              <spotLight intensity={2} angle={0.1} penumbra={1} position={[10,10,10]} castShadow/>
                <Model/>
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true}/>
            </Suspense>
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}

export default Chick;


function Model() {
  const ref = useRef<any>()
  const { nodes, materials }:any = useGLTF('/ThreeFile/chick.gltf')
  return (
    <group ref={ref} dispose={null}>
      <group position={[0.01, 0.82, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.76}>
        <mesh geometry={nodes.Object_5.geometry} material={materials.defaultMat_2} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.defaultMat_1} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.defaultMat_0} />
        <mesh geometry={nodes.Object_11.geometry} material={materials['defaultMat.004']} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.defaultMat_3} />
      </group>
    </group>
  )
}

