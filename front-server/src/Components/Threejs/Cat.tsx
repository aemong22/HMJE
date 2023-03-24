import {Suspense, useEffect, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three'

interface GamingProps {
  abdx: number | string;
}

function Cat() {
  
  return (
    <div>
      <Canvas style={{border: 'solid 4px black', width: '100vw', height: '100vh'}}>
        <mesh scale={2} position={[0,-2,0]}>
          <Suspense fallback={null}>
            <ambientLight />
            <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10,15,10]} castShadow/>
              <Model motion={'Idle02'}/>
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true}/>
          </Suspense>
        </mesh>
      </Canvas>
    </div>
  );
}

export default Cat;


function Model({motion}:any) {
  const group = useRef<any>()
  const { nodes, materials, animations }:any = useGLTF('/ThreeFile/Cat.gltf')
  // console.log('애니메이션',animations[0]);
  
  const { actions, mixer, clips }:any = useAnimations(animations, group)

  useEffect(()=> {
    console.log('action: ',actions);    
    actions.Sleep.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    actions.Sleep.clampWhenFinished = true
    actions.Sleep.loop = THREE.LoopOnce as any
    actions.Sleep.reset()
  }, [mixer])

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.root} />
          <group name="Chibi_Cat">
            <skinnedMesh name="Mesh001" geometry={nodes.Mesh001.geometry} material={materials['M_Chibi_Cat_01.001']} skeleton={nodes.Mesh001.skeleton} />
            <skinnedMesh name="Mesh001_1" geometry={nodes.Mesh001_1.geometry} material={materials['M_Chibi_Emo_01.001']} skeleton={nodes.Mesh001_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}