import {Suspense, useEffect, useRef, useState} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

function Camel() {
  return (
    <div>
      <div className='h-screen w-screen'>
        <Canvas style={{height: '100vh', width: '100vw'}}>
          <mesh scale={1} position={[0,-0.5,0]}>
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

export default Camel;


function Model() {
  const group = useRef<any>()
  const { nodes, materials, animations }:any = useGLTF('/ThreeFile/Camel.gltf')
  // console.log(animations[0]);
  
  const { actions, mixer }:any = useAnimations(animations, group)
  console.log(actions);
  
  useEffect(()=> {
    console.log(actions);
    
    actions.Animation.play()
  },[mixer])
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Rig" scale={0.4}>
          <primitive object={nodes.root} />
          <skinnedMesh name="Mesh" geometry={nodes.Mesh.geometry} material={materials['M_Swan.004']} skeleton={nodes.Mesh.skeleton} />
        </group>
      </group>
    </group>
  )
}
