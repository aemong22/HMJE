import {Suspense, useEffect, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import './Three.css'

function ClownFish() {
  return (
    <div className='w-full h-full border-4 waterImg'>
      <Canvas>
        <mesh scale={4} position={[0,-1.3,0]} rotation={[0,0.3,0]}>
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

export default ClownFish;


function Model() {
  const group = useRef<any>()
  const { nodes, materials, animations }:any = useGLTF('/ThreeFile/ClownFish.gltf')
  // console.log('애니메이션',animations[0]);
  
  const { actions, mixer, clips }:any = useAnimations(animations, group)

  useEffect(()=> {
    console.log('action: ',actions);
    console.log('mixer: ',mixer );
    console.log('clips: ',clips);
    
    actions.Walk.play()
  }, [mixer])

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Rig">
          <primitive object={nodes.root} />
          <skinnedMesh name="Mesh" geometry={nodes.Mesh.geometry} material={materials['M_Clownfish.001']} skeleton={nodes.Mesh.skeleton} />
        </group>
      </group>
    </group>
  )
}

