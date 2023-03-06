import {Suspense, useRef, useState} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

function Bunny() {
  return (
    <div>
      <div>
        <Canvas style={{width: '30rem', height: '30rem', border: 'solid 2px red'}}>
          <mesh scale={1} position={[0,-1.3,0]}>
            <Suspense fallback={null}>
              <ambientLight />
              <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10,15,10]} castShadow/>
                <Model/>
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true}/>
            </Suspense>
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}

export default Bunny;



function Model(props:any) {
  const ref = useRef()
  const { nodes, materials }:any = useGLTF<any>('/ThreeFile/bunny.gltf')
  return (
    <group ref={ref} {...props} dispose={null}>
      <group position={[0, -0.1, 0]} rotation={[-Math.PI / 2.35, 0, 0]} scale={0.64}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_12.geometry} material={materials['Material.008']} position={[0.02, 1.05, 0.04]} scale={[0.56, 0.6, 0.55]} />
          <mesh geometry={nodes.Object_6.geometry} material={materials['Material.009']} position={[0.02, 1.05, 0]} scale={[0.62, 0.67, 0.61]} />
          <mesh geometry={nodes.Object_10.geometry} material={materials['Material.007']} position={[0.02, 2.3, 0]} scale={[1.17, 0.91, 1]} />
          <mesh geometry={nodes.Object_20.geometry} material={materials['Material.003']} position={[0.02, 0.13, 0]} />
          <mesh geometry={nodes.Object_14.geometry} material={materials['Material.002']} position={[0.02, 0.13, 0]} />
          <mesh geometry={nodes.Object_4.geometry} material={materials.bunny_texturee} position={[0.02, 2.3, 0.01]} scale={[1.17, 0.91, 0.94]} />
          <mesh geometry={nodes.Object_18.geometry} material={materials['Material.001']} position={[0.02, 0, 0]} />
          <mesh geometry={nodes.Object_8.geometry} material={materials['Material.010']} position={[0.02, 2.3, -0.02]} rotation={[0.12, 0, 0]} scale={[1.17, 0.91, 0.94]} />
          <mesh geometry={nodes.Object_22.geometry} material={materials['Material.007']} position={[0.02, 2.16, 0.87]} rotation={[-0.34, 0, 0]} scale={0.08} />
          <mesh geometry={nodes.Object_16.geometry} material={materials['Material.008']} position={[0.02, 1, -0.57]} scale={0.22} />
        </group>
      </group>
    </group>
  )
}