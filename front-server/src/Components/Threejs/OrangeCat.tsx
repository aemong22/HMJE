import {MouseEventHandler, Suspense, useEffect, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Sky, useTexture } from '@react-three/drei';
import * as THREE from 'three'

function OrangeCat({sendEmo}:any) {
  const [emo, setEmo] = useState<any>()
  useEffect(()=> {
    if (sendEmo === 0) {
      setEmo(<Default/>)
    } else if (sendEmo === 1) {
      setEmo(<Smile/>)
    } else if (sendEmo === 2) {
      setEmo(<Sad/>)
    } else {
      setEmo(<Dazed/>)
    }
  },[])
  return (
    <div className='w-full h-full mt-2'>
      <Canvas style={{width: '100%', height: '100%', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem'}}>
        <mesh scale={1} position={[0,-2.4,2.5]}>
          <Suspense fallback={null}>
            <ambientLight />
            <directionalLight 
            castShadow
            position={[0, 30, 0]}
            intensity={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
        />
            <Sky azimuth={0.8} sunPosition={[5, 30, 8]} distance={450000} inclination={0}/>
            {emo}
            {/* <OrbitControls enablePan={false} enableZoom={true} enableRotate={false}/> */}
          </Suspense>
        </mesh>
      </Canvas>
    </div>
  );
}

export default OrangeCat;


function Default() {
  const group = useRef<any>()
  const { nodes, materials, animations,  }:any = useGLTF('/ThreeFile/Orange/Default.gltf') 
  const { actions, mixer, clips }:any = useAnimations(animations, group)


  
  useEffect(()=> {
    
    actions.Angry.play()
    actions.Tree.play()
    actions.Fly.play()
    actions.Fly2.play()
    actions.Grass.play()
    actions.Grass2.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    actions.Angry.clampWhenFinished = true
    actions.Angry.loop = THREE.LoopOnce as any
    actions.Angry.reset()
  }, [mixer])

  const click = () => {
    
    actions.Bow.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    actions.Bow.clampWhenFinished = true
    actions.Bow.loop = THREE.LoopOnce as any
    actions.Bow.reset()
  }

  return (
    <group ref={group} dispose={null} onClick={click}>
      <group name="Scene">
        <group name="Tree" position={[-0.63, 1.05, -0.34]} rotation={[1.58, 0.08, 0.22]} scale={0.01}>
          <primitive object={nodes.Tree_root} />
          <skinnedMesh name="TreeA" geometry={nodes.TreeA.geometry} material={materials['M_Environment_A.001']} skeleton={nodes.TreeA.skeleton} />
        </group>
        <group name="Fly" position={[1.39, 1.61, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
          <primitive object={nodes.Butterfly_root} />
          <skinnedMesh name="Butterfly_A" geometry={nodes.Butterfly_A.geometry} material={materials.M_Butterfly_A} skeleton={nodes.Butterfly_A.skeleton} />
        </group>
        <group name="Fly2" position={[-0.72, 1.1, 0.71]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
          <primitive object={nodes.Butterfly_root_1} />
          <skinnedMesh name="Butterfly_A001" geometry={nodes.Butterfly_A001.geometry} material={materials['M_Butterfly_A.001']} skeleton={nodes.Butterfly_A001.skeleton} />
        </group>
        <group name="Grass" position={[0.68, 1.09, -0.64]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Grass_root} />
          <skinnedMesh name="Grass_A" geometry={nodes.Grass_A.geometry} material={materials['M_Environment_A.002']} skeleton={nodes.Grass_A.skeleton} />
        </group>
        <group name="Grass2" position={[-1, 1.27, 0.37]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Grass_root_1} />
          <skinnedMesh name="Grass_A001" geometry={nodes.Grass_A001.geometry} material={materials['M_Environment_A.003']} skeleton={nodes.Grass_A001.skeleton} />
        </group>
        <group name="Cat" position={[0, 1.31, 0.43]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.root} />
          <group name="Chibi_Cat">
            <skinnedMesh name="Mesh006" geometry={nodes.Mesh006.geometry} material={materials.M_Chibi_Cat_01} skeleton={nodes.Mesh006.skeleton} />
            <skinnedMesh name="Mesh006_1" geometry={nodes.Mesh006_1.geometry} material={materials.M_Chibi_Emo_01} skeleton={nodes.Mesh006_1.skeleton} />
          </group>
        </group>
        <mesh name="Floor" geometry={nodes.Floor.geometry} material={materials.M_Environment_A} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  )
}

function Smile() {
  const group = useRef<any>()
  const { nodes, materials, animations }:any = useGLTF('/ThreeFile/Orange/Smile.gltf')  
  const { actions, mixer, clips }:any = useAnimations(animations, group)

  
  useEffect(()=> {
    actions.Angry.play()
    actions.Tree.play()
    actions.Fly.play()
    actions.Fly2.play()
    actions.Grass.play()
    actions.Grass2.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    actions.Angry.clampWhenFinished = true
    actions.Angry.loop = THREE.LoopOnce as any
    actions.Angry.reset()
  }, [mixer])

  const click = () => {
    
    actions.Bow.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    actions.Bow.clampWhenFinished = true
    actions.Bow.loop = THREE.LoopOnce as any
    actions.Bow.reset()
  }
  return (
    <group ref={group} dispose={null} onClick={click}>
      <group name="Scene">
        <group name="Tree" position={[-0.63, 1.05, -0.34]} rotation={[1.58, 0.08, 0.22]} scale={0.01}>
          <primitive object={nodes.Tree_root} />
          <skinnedMesh name="TreeA" geometry={nodes.TreeA.geometry} material={materials['M_Environment_A.001']} skeleton={nodes.TreeA.skeleton} />
        </group>
        <group name="Fly" position={[1.39, 1.61, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
          <primitive object={nodes.Butterfly_root} />
          <skinnedMesh name="Butterfly_A" geometry={nodes.Butterfly_A.geometry} material={materials.M_Butterfly_A} skeleton={nodes.Butterfly_A.skeleton} />
        </group>
        <group name="Fly2" position={[-0.72, 1.1, 0.71]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
          <primitive object={nodes.Butterfly_root_1} />
          <skinnedMesh name="Butterfly_A001" geometry={nodes.Butterfly_A001.geometry} material={materials['M_Butterfly_A.001']} skeleton={nodes.Butterfly_A001.skeleton} />
        </group>
        <group name="Grass" position={[0.68, 1.09, -0.64]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Grass_root} />
          <skinnedMesh name="Grass_A" geometry={nodes.Grass_A.geometry} material={materials['M_Environment_A.002']} skeleton={nodes.Grass_A.skeleton} />
        </group>
        <group name="Grass2" position={[-1, 1.27, 0.37]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Grass_root_1} />
          <skinnedMesh name="Grass_A001" geometry={nodes.Grass_A001.geometry} material={materials['M_Environment_A.003']} skeleton={nodes.Grass_A001.skeleton} />
        </group>
        <group name="Cat" position={[0, 1.31, 0.43]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.root} />
          <group name="Chibi_Cat">
            <skinnedMesh name="Mesh006" geometry={nodes.Mesh006.geometry} material={materials.M_Chibi_Cat_01} skeleton={nodes.Mesh006.skeleton} />
            <skinnedMesh name="Mesh006_1" geometry={nodes.Mesh006_1.geometry} material={materials.M_Chibi_Emo_01} skeleton={nodes.Mesh006_1.skeleton} />
          </group>
        </group>
        <mesh name="Floor" geometry={nodes.Floor.geometry} material={materials.M_Environment_A} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  )
}

function Dazed() {
  const group = useRef<any>()
  const { nodes, materials, animations }:any = useGLTF('/ThreeFile/Orange/Dazed.gltf')  
  const { actions, mixer, clips }:any = useAnimations(animations, group)

  
  useEffect(()=> {
    actions.Angry.play()
    actions.Tree.play()
    actions.Fly.play()
    actions.Fly2.play()
    actions.Grass.play()
    actions.Grass2.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    actions.Angry.clampWhenFinished = true
    actions.Angry.loop = THREE.LoopOnce as any
    actions.Angry.reset()
  }, [mixer])

  const click = () => {
    
    actions.Bow.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    actions.Bow.clampWhenFinished = true
    actions.Bow.loop = THREE.LoopOnce as any
    actions.Bow.reset()
  }

  return (
    <group ref={group} dispose={null} onClick={click}>
      <group name="Scene">
        <group name="Tree" position={[-0.63, 1.05, -0.34]} rotation={[1.58, 0.08, 0.22]} scale={0.01}>
          <primitive object={nodes.Tree_root} />
          <skinnedMesh name="TreeA" geometry={nodes.TreeA.geometry} material={materials['M_Environment_A.001']} skeleton={nodes.TreeA.skeleton} />
        </group>
        <group name="Fly" position={[1.39, 1.61, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
          <primitive object={nodes.Butterfly_root} />
          <skinnedMesh name="Butterfly_A" geometry={nodes.Butterfly_A.geometry} material={materials.M_Butterfly_A} skeleton={nodes.Butterfly_A.skeleton} />
        </group>
        <group name="Fly2" position={[-0.72, 1.1, 0.71]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
          <primitive object={nodes.Butterfly_root_1} />
          <skinnedMesh name="Butterfly_A001" geometry={nodes.Butterfly_A001.geometry} material={materials['M_Butterfly_A.001']} skeleton={nodes.Butterfly_A001.skeleton} />
        </group>
        <group name="Grass" position={[0.68, 1.09, -0.64]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Grass_root} />
          <skinnedMesh name="Grass_A" geometry={nodes.Grass_A.geometry} material={materials['M_Environment_A.002']} skeleton={nodes.Grass_A.skeleton} />
        </group>
        <group name="Grass2" position={[-1, 1.27, 0.37]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Grass_root_1} />
          <skinnedMesh name="Grass_A001" geometry={nodes.Grass_A001.geometry} material={materials['M_Environment_A.003']} skeleton={nodes.Grass_A001.skeleton} />
        </group>
        <group name="Cat" position={[0, 1.31, 0.43]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.root} />
          <group name="Chibi_Cat">
            <skinnedMesh name="Mesh006" geometry={nodes.Mesh006.geometry} material={materials.M_Chibi_Cat_01} skeleton={nodes.Mesh006.skeleton} />
            <skinnedMesh name="Mesh006_1" geometry={nodes.Mesh006_1.geometry} material={materials.M_Chibi_Emo_01} skeleton={nodes.Mesh006_1.skeleton} />
          </group>
        </group>
        <mesh name="Floor" geometry={nodes.Floor.geometry} material={materials.M_Environment_A} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  )
}

function Sad() {
  const group = useRef<any>()
  const { nodes, materials, animations }:any = useGLTF('/ThreeFile/Orange/Sad.gltf')  
  const { actions, mixer, clips }:any = useAnimations(animations, group)

  
  useEffect(()=> {
    actions.Angry.play()
    actions.Tree.play()
    actions.Fly.play()
    actions.Fly2.play()
    actions.Grass.play()
    actions.Grass2.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    actions.Angry.clampWhenFinished = true
    actions.Angry.loop = THREE.LoopOnce as any
    actions.Angry.reset()
  }, [mixer])

  const click = () => {
    
    actions.Bow.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    actions.Bow.clampWhenFinished = true
    actions.Bow.loop = THREE.LoopOnce as any
    actions.Bow.reset()
  }
  return (
    <group ref={group} dispose={null} onClick={click}>
      <group name="Scene">
        <group name="Tree" position={[-0.63, 1.05, -0.34]} rotation={[1.58, 0.08, 0.22]} scale={0.01}>
          <primitive object={nodes.Tree_root} />
          <skinnedMesh name="TreeA" geometry={nodes.TreeA.geometry} material={materials['M_Environment_A.001']} skeleton={nodes.TreeA.skeleton} />
        </group>
        <group name="Fly" position={[1.39, 1.61, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
          <primitive object={nodes.Butterfly_root} />
          <skinnedMesh name="Butterfly_A" geometry={nodes.Butterfly_A.geometry} material={materials.M_Butterfly_A} skeleton={nodes.Butterfly_A.skeleton} />
        </group>
        <group name="Fly2" position={[-0.72, 1.1, 0.71]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
          <primitive object={nodes.Butterfly_root_1} />
          <skinnedMesh name="Butterfly_A001" geometry={nodes.Butterfly_A001.geometry} material={materials['M_Butterfly_A.001']} skeleton={nodes.Butterfly_A001.skeleton} />
        </group>
        <group name="Grass" position={[0.68, 1.09, -0.64]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Grass_root} />
          <skinnedMesh name="Grass_A" geometry={nodes.Grass_A.geometry} material={materials['M_Environment_A.002']} skeleton={nodes.Grass_A.skeleton} />
        </group>
        <group name="Grass2" position={[-1, 1.27, 0.37]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Grass_root_1} />
          <skinnedMesh name="Grass_A001" geometry={nodes.Grass_A001.geometry} material={materials['M_Environment_A.003']} skeleton={nodes.Grass_A001.skeleton} />
        </group>
        <group name="Cat" position={[0, 1.31, 0.43]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.root} />
          <group name="Chibi_Cat">
            <skinnedMesh name="Mesh006" geometry={nodes.Mesh006.geometry} material={materials.M_Chibi_Cat_01} skeleton={nodes.Mesh006.skeleton} />
            <skinnedMesh name="Mesh006_1" geometry={nodes.Mesh006_1.geometry} material={materials.M_Chibi_Emo_01} skeleton={nodes.Mesh006_1.skeleton} />
          </group>
        </group>
        <mesh name="Floor" geometry={nodes.Floor.geometry} material={materials.M_Environment_A} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  )
}