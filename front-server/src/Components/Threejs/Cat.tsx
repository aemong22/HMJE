import {Suspense, useEffect, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Sky } from '@react-three/drei';
import * as THREE from 'three'

interface GamingProps {
  abdx: number | string;
}

function Cat() {
  
  return (
    <div>
      <Canvas style={{border: 'solid 4px black', width: '100vw', height: '100vh'}}>
        <mesh scale={1} position={[0,-1.5,1.7]}>
          <Suspense fallback={null}>
            <ambientLight />
            {/* <Sky/> */}
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
    console.log('action: ', actions); 
    // console.log('nodes: ', nodes); 
    console.log('materials: ',materials); 
    actions.Cute.play()
    actions.TreeAni.play()
    actions.Butterfly.play()
    actions.Butterfly2.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    // actions.Cute.clampWhenFinished = true
    // actions.Cute.loop = THREE.LoopOnce as any
    // actions.Cute.reset()
  }, [mixer])

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Cat" position={[0.11, 0.55, -0.37]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.root} />
          <group name="Chibi_Cat">
            <skinnedMesh name="Mesh001" geometry={nodes.Mesh001.geometry} material={materials.M_Chibi_Cat_01} skeleton={nodes.Mesh001.skeleton} />
            <skinnedMesh name="Mesh001_1" geometry={nodes.Mesh001_1.geometry} material={materials.M_Chibi_Emo_01} skeleton={nodes.Mesh001_1.skeleton} />
          </group>
        </group>
        <group name="Tree" position={[-1.73, 0.25, -0.96]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Tree_root} />
          <skinnedMesh name="TreeA" geometry={nodes.TreeA.geometry} material={materials['M_Environment_A.001']} skeleton={nodes.TreeA.skeleton} />
        </group>
        <group name="Butterfly" position={[1.19, 1.43, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.1}>
          <primitive object={nodes.Butterfly_root} />
          <skinnedMesh name="Butterfly_A" geometry={nodes.Butterfly_A.geometry} material={materials.M_Butterfly_A} skeleton={nodes.Butterfly_A.skeleton} />
        </group>
        <group name="Butterfly2" position={[-0.73, 0.72, 0.3]} rotation={[Math.PI / 2, 0, 0]} scale={0.1}>
          <primitive object={nodes.Butterfly_root_1} />
          <skinnedMesh name="Butterfly_A001" geometry={nodes.Butterfly_A001.geometry} material={materials['M_Butterfly_A.001']} skeleton={nodes.Butterfly_A001.skeleton} />
        </group>
        <mesh name="Floor_Floor_A" geometry={nodes.Floor_Floor_A.geometry} material={materials['M_Environment_A.003']} position={[0, 0.81, -1.68]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  )
}