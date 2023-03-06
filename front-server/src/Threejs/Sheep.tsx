import {Suspense, useRef, useState} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

function Sheep() {
  return (
    <div>
      <div>
        <Canvas style={{width: '30rem', height: '30rem', border: 'solid 2px red'}}>
          <mesh scale={4} position={[0,0,0]}>
            <Suspense fallback={null}>
              <ambientLight />
              <spotLight intensity={2} angle={0.1} penumbra={1} position={[5,15,10]} castShadow/>
              <spotLight intensity={4} angle={0.1} penumbra={1} position={[0,15,10]} castShadow/>
              <spotLight intensity={4} angle={0.1} penumbra={1} position={[0,0,10]} castShadow/>
              <spotLight intensity={4} angle={0.1} penumbra={1} position={[0,-5,10]} castShadow/>
              <spotLight intensity={4} angle={0.1} penumbra={1} position={[0,-5,0]} castShadow/>
              <spotLight intensity={4} angle={0.1} penumbra={1} position={[0,-5,-10]} castShadow/>
              <spotLight intensity={4} angle={0.1} penumbra={1} position={[-40,20,-20]} castShadow/>
              <spotLight intensity={4} angle={0.1} penumbra={1} position={[40,20,-20]} castShadow/>
                <Model/>
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true}/>
            </Suspense>
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}

export default Sheep;



function Model() {
  const group = useRef<any>()
  const { nodes, materials }:any = useGLTF('/ThreeFile/sheep.gltf')
  return (
    <group ref={group}  dispose={null}>
      <group name="Scene">
      <group name="Bip001" position={[0, 0.1, -0.05]} rotation={[1.76, -Math.PI / 2, 0]} scale={0.1}>
          <group name="Bip001_Footsteps" position={[3.82, -0.05, 0]} rotation={[-Math.PI / 2, 0.01, 1.57]} />
          <primitive object={nodes.Bip001_Pelvis} />
          <skinnedMesh name="body" geometry={nodes.body.geometry} material={materials['Material #50']} skeleton={nodes.body.skeleton} />
          <skinnedMesh name="leg" geometry={nodes.leg.geometry} material={materials['Material #50']} skeleton={nodes.leg.skeleton} />
        </group>
      </group>
    </group>
  )
}