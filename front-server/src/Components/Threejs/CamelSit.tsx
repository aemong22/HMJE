import {Suspense, useEffect, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

function CamelSit() {
  return (
    <div>
      <Canvas>
        <mesh scale={1} position={[0,-2.4,0]}>
          <Suspense fallback={null}>
            <ambientLight />
            <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10,15,10]} castShadow/>
              <Model/>
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true}/>
          </Suspense>
        </mesh>
      </Canvas>
    </div>
  );
}

export default CamelSit;


function Model() {
  const group = useRef<any>()
  const { nodes, materials, animations }:any = useGLTF('/ThreeFile/Camel.gltf')
  const { actions, mixer, clips }:any = useAnimations(animations, group)
  
  useEffect(()=> {
    console.log('action: ',actions);
    console.log('mixer: ',mixer );
    console.log('clips: ',clips);
    actions.Animation.play()
  })
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Camel_Animations" rotation={[Math.PI / 2, 0, 0.7]} scale={0.01}>
          <group name="Rig" rotation={[-1.57, 0, 0]} scale={3}>
            <group name="root">
              <primitive object={nodes.body} />
              <skinnedMesh name="Mesh" geometry={nodes.Mesh.geometry} material={materials['M_Camel.002']} skeleton={nodes.Mesh.skeleton} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}