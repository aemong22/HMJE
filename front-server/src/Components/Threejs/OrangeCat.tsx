import React, {MouseEventHandler, Suspense, useEffect, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Sky, useTexture } from '@react-three/drei';
import * as THREE from 'three'
import Loading from "../Common/Loading";

function OrangeCat({sendEmo, dataLevel}:any) {

  const [emo, setEmo] = useState<any>()
  

  useEffect(()=> {
    if (sendEmo === 0) {
      setEmo(<Default level={dataLevel}/>)
    } else if (sendEmo === 1) {
      setEmo(<Smile level={dataLevel}/>)
    } else if (sendEmo === 2) {
      setEmo(<Sad level={dataLevel}/>)
    } else {
      setEmo(<Dazed level={dataLevel}/>)
    }
  },[])

  // const fallback = (): React.ReactNode => <Loading />;
    return (
    <>
      {/* <Suspense fallback={<Loading/>}> */}
      <div className='w-full h-full'>
        <Canvas style={{width: '100%', height: '100%', borderRadius: '0.5rem'}}>
          <mesh scale={1} position={[0,-2.4,2.5]}>
            {/* 로딩중일때  */}
              <ambientLight />
              <directionalLight 
                castShadow
                position={[0, 30, 0]}
                intensity={0}
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
          </mesh>
        </Canvas>
      </div>
      {/* </Suspense> */}
    </>
  );
}

export default OrangeCat;


function Default({level}:(number|any)) {
  const group = useRef<any>()
  const { nodes, materials, animations,  }:any = useGLTF('/ThreeFile/Orange/Default.gltf') 
  const { actions, mixer, clips }:any = useAnimations(animations, group)


  
  useEffect(()=> {
    
    actions.dle05.play()    
    actions.Tree.play()
    actions.Fly.play()
    actions.Fly2.play()
    actions.Grass.play()
    actions.Grass2.play()
    actions.Whirligig1.play()
    actions.Whirligig2.play()
    // actions.dle05.reset()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    // actions.dle05.clampWhenFinished = true
    // actions.dle05.loop = THREE.LoopOnce as any
    // actions.dle05.reset()
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
        
      {/* 레벨 1 */}
      <mesh name="Floor" geometry={nodes.Floor.geometry} material={materials.M_Environment_A} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <group name="Cat" position={[0, 1.31, 0.43]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.root} />
        <group name="Chibi_Cat">
          <skinnedMesh name="Mesh006" geometry={nodes.Mesh006.geometry} material={materials.M_Chibi_Cat_01} skeleton={nodes.Mesh006.skeleton} />
          <skinnedMesh name="Mesh006_1" geometry={nodes.Mesh006_1.geometry} material={materials.M_Chibi_Emo_01} skeleton={nodes.Mesh006_1.skeleton} />
        </group>
      </group>
        {
          level>=2?(<group name="Tree" position={[-0.63, 1.05, -0.94]} rotation={[1.58, 0.08, 0.22]} scale={0.01}>
            <primitive object={nodes.Tree_root} />
              <skinnedMesh name="TreeA" geometry={nodes.TreeA.geometry} material={materials['M_Environment_A.001']} skeleton={nodes.TreeA.skeleton} />
            </group>):null
        }
        {
          level>=3&&(
            <>
              <group name="Fly" position={[1.39, 1.61, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
                <primitive object={nodes.Butterfly_root} />
                <skinnedMesh name="Butterfly_A" geometry={nodes.Butterfly_A.geometry} material={materials.M_Butterfly_A} skeleton={nodes.Butterfly_A.skeleton} />
              </group>
              <group name="Fly2" position={[-0.72, 1.1, 0.71]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
                <primitive object={nodes.Butterfly_root_1} />
                <skinnedMesh name="Butterfly_A001" geometry={nodes.Butterfly_A001.geometry} material={materials['M_Butterfly_A.001']} skeleton={nodes.Butterfly_A001.skeleton} />
              </group>
              <group name="Grass" position={[-0.81, 1.1, 0.50]} rotation={[Math.PI / 2, 0, 0]} scale={0.008}>
                <primitive object={nodes.Grass_root} />
                <skinnedMesh name="Grass_A" geometry={nodes.Grass_A.geometry} material={materials['M_Environment_A.002']} skeleton={nodes.Grass_A.skeleton} />
              </group>
              <group name="Grass2" position={[1.41, 1.13, 0.57]} rotation={[Math.PI / 2, 0, 0]} scale={0.008}>
                <primitive object={nodes.Grass_root_1} />
                <skinnedMesh name="Grass_A001" geometry={nodes.Grass_A001.geometry} material={materials['M_Environment_A.003']} skeleton={nodes.Grass_A001.skeleton} />
              </group>
            </>
          )
        }
        
        {
          level>=4&&(
            <>
              <group name="Whirligig1" position={[1.88, 0.88, 0.14]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.Whirligig_root} />
                <skinnedMesh name="WhirligigObj1" geometry={nodes.WhirligigObj1.geometry} material={materials.M_Whirligig} skeleton={nodes.WhirligigObj1.skeleton} />
              </group>
              <group name="Whirligig2" position={[1.53, 0.92, -0.30]} rotation={[Math.PI / 2, 0, 0]} scale={0.015}>
                <primitive object={nodes.Whirligig_root_1} />
                <skinnedMesh name="WhirligigObj2" geometry={nodes.WhirligigObj2.geometry} material={materials['M_Whirligig.001']} skeleton={nodes.WhirligigObj2.skeleton} />
              </group>
            </>
          )
        }
        {
          level>=5&&(
            <group name="Bag" position={[0.82, 1.72, -0.24]} rotation={[1.9, -0.07, 2.95]} scale={0.011}>
              <primitive object={nodes.Bag_center} />
              <skinnedMesh name="BagObj" geometry={nodes.BagObj.geometry} material={materials.M_Bag_bread} skeleton={nodes.BagObj.skeleton} />
            </group>
          )
        }
        {
          level>=6&&(
            <>
              <mesh name="Mushroom_1" geometry={nodes.Mushroom_1.geometry} material={materials['M_Environment_A.004']} position={[-1.46, 1.11, 0.24]} rotation={[1.55, -0.34, 0.04]} scale={0.005} />
              <mesh name="Mushroom_2" geometry={nodes.Mushroom_2.geometry} material={materials['M_Environment_A.005']} position={[-1.54, 1.14, 0.27]} rotation={[1.5, 0.43, 2.46]} scale={0.005} />
            </>
          )
        }
        {
          level>=7&&(
            <group name="Wapon" position={[-1.51, 1.72, -0.61]} rotation={[2.08, 1.23, -2.23]} scale={0.01}>
              <primitive object={nodes.Baton_wood_center} />
              <skinnedMesh name="Wapon001" geometry={nodes.Wapon001.geometry} material={materials.M_Baton_wood} skeleton={nodes.Wapon001.skeleton} />
            </group>
          )
        }
        {
          level>=8&&(
            <group name="Hat" position={[-1.46, 2.29, -0.79]} rotation={[1.28, 0.97, 1.38]} scale={0.005}>
              <primitive object={nodes.Hiking_hat_root} />
              <skinnedMesh name="HatObj" geometry={nodes.HatObj.geometry} material={materials.M_Hiking_hat_A} skeleton={nodes.HatObj.skeleton} />
            </group>
          )
        }
        {
          level>=9&&(
            <>
              <mesh name="Fish" geometry={nodes.Fish.geometry} material={materials.M_Dried_fish} position={[-0.92, 1.36, -0.45]} rotation={[-0.25, -0.5, -0.11]} scale={0.01} />
              <mesh name="MeatA" geometry={nodes.MeatA.geometry} material={materials.M_MeatA} position={[-1.15, 1.46, -0.64]} rotation={[-0.87, -0.9, 2.41]} scale={0.01} />
            </>
          )
        }

      </group>
    </group>
  )
}

function Smile({level}:(number|any)) {
  
  const group = useRef<any>()
  const { nodes, materials, animations,  }:any = useGLTF('/ThreeFile/Orange/Smile.gltf') 
  const { actions, mixer, clips }:any = useAnimations(animations, group)
  

  
  useEffect(()=> {
    
    actions.dle05.play()    
    actions.Tree.play()
    actions.Fly.play()
    actions.Fly2.play()
    actions.Grass.play()
    actions.Grass2.play()
    actions.Whirligig1.play()
    actions.Whirligig2.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    // actions.Angry.clampWhenFinished = true
    // actions.Angry.loop = THREE.LoopOnce as any
    // actions.Angry.reset()
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
        
      {/* 레벨 1 */}
      <mesh name="Floor" geometry={nodes.Floor.geometry} material={materials.M_Environment_A} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <group name="Cat" position={[0, 1.31, 0.43]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.root} />
        <group name="Chibi_Cat">
          <skinnedMesh name="Mesh006" geometry={nodes.Mesh006.geometry} material={materials.M_Chibi_Cat_01} skeleton={nodes.Mesh006.skeleton} />
          <skinnedMesh name="Mesh006_1" geometry={nodes.Mesh006_1.geometry} material={materials.M_Chibi_Emo_01} skeleton={nodes.Mesh006_1.skeleton} />
        </group>
      </group>
        {
          level>=2?(<group name="Tree" position={[-0.63, 1.05, -0.94]} rotation={[1.58, 0.08, 0.22]} scale={0.01}>
            <primitive object={nodes.Tree_root} />
              <skinnedMesh name="TreeA" geometry={nodes.TreeA.geometry} material={materials['M_Environment_A.001']} skeleton={nodes.TreeA.skeleton} />
            </group>):null
        }
        {
          level>=3&&(
            <>
              <group name="Fly" position={[1.39, 1.61, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
                <primitive object={nodes.Butterfly_root} />
                <skinnedMesh name="Butterfly_A" geometry={nodes.Butterfly_A.geometry} material={materials.M_Butterfly_A} skeleton={nodes.Butterfly_A.skeleton} />
              </group>
              <group name="Fly2" position={[-0.72, 1.1, 0.71]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
                <primitive object={nodes.Butterfly_root_1} />
                <skinnedMesh name="Butterfly_A001" geometry={nodes.Butterfly_A001.geometry} material={materials['M_Butterfly_A.001']} skeleton={nodes.Butterfly_A001.skeleton} />
              </group>
              <group name="Grass" position={[-0.81, 1.1, 0.50]} rotation={[Math.PI / 2, 0, 0]} scale={0.008}>
                <primitive object={nodes.Grass_root} />
                <skinnedMesh name="Grass_A" geometry={nodes.Grass_A.geometry} material={materials['M_Environment_A.002']} skeleton={nodes.Grass_A.skeleton} />
              </group>
              <group name="Grass2" position={[1.41, 1.13, 0.57]} rotation={[Math.PI / 2, 0, 0]} scale={0.008}>
                <primitive object={nodes.Grass_root_1} />
                <skinnedMesh name="Grass_A001" geometry={nodes.Grass_A001.geometry} material={materials['M_Environment_A.003']} skeleton={nodes.Grass_A001.skeleton} />
              </group>
            </>
          )
        }
        
        {
          level>=4&&(
            <>
              <group name="Whirligig1" position={[1.88, 0.88, 0.14]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.Whirligig_root} />
                <skinnedMesh name="WhirligigObj1" geometry={nodes.WhirligigObj1.geometry} material={materials.M_Whirligig} skeleton={nodes.WhirligigObj1.skeleton} />
              </group>
              <group name="Whirligig2" position={[1.53, 0.92, -0.30]} rotation={[Math.PI / 2, 0, 0]} scale={0.015}>
                <primitive object={nodes.Whirligig_root_1} />
                <skinnedMesh name="WhirligigObj2" geometry={nodes.WhirligigObj2.geometry} material={materials['M_Whirligig.001']} skeleton={nodes.WhirligigObj2.skeleton} />
              </group>
            </>
          )
        }
        {
          level>=5&&(
            <group name="Bag" position={[0.82, 1.72, -0.24]} rotation={[1.9, -0.07, 2.95]} scale={0.011}>
              <primitive object={nodes.Bag_center} />
              <skinnedMesh name="BagObj" geometry={nodes.BagObj.geometry} material={materials.M_Bag_bread} skeleton={nodes.BagObj.skeleton} />
            </group>
          )
        }
        {
          level>=6&&(
            <>
              <mesh name="Mushroom_1" geometry={nodes.Mushroom_1.geometry} material={materials['M_Environment_A.004']} position={[-1.46, 1.11, 0.24]} rotation={[1.55, -0.34, 0.04]} scale={0.005} />
              <mesh name="Mushroom_2" geometry={nodes.Mushroom_2.geometry} material={materials['M_Environment_A.005']} position={[-1.54, 1.14, 0.27]} rotation={[1.5, 0.43, 2.46]} scale={0.005} />
            </>
          )
        }
        {
          level>=7&&(
            <group name="Wapon" position={[-1.51, 1.72, -0.61]} rotation={[2.08, 1.23, -2.23]} scale={0.01}>
              <primitive object={nodes.Baton_wood_center} />
              <skinnedMesh name="Wapon001" geometry={nodes.Wapon001.geometry} material={materials.M_Baton_wood} skeleton={nodes.Wapon001.skeleton} />
            </group>
          )
        }
        {
          level>=8&&(
            <group name="Hat" position={[-1.46, 2.29, -0.79]} rotation={[1.28, 0.97, 1.38]} scale={0.005}>
              <primitive object={nodes.Hiking_hat_root} />
              <skinnedMesh name="HatObj" geometry={nodes.HatObj.geometry} material={materials.M_Hiking_hat_A} skeleton={nodes.HatObj.skeleton} />
            </group>
          )
        }
        {
          level>=9&&(
            <>
              <mesh name="Fish" geometry={nodes.Fish.geometry} material={materials.M_Dried_fish} position={[-0.92, 1.36, -0.45]} rotation={[-0.25, -0.5, -0.11]} scale={0.01} />
              <mesh name="MeatA" geometry={nodes.MeatA.geometry} material={materials.M_MeatA} position={[-1.15, 1.46, -0.64]} rotation={[-0.87, -0.9, 2.41]} scale={0.01} />
            </>
          )
        }

      </group>
    </group>
  )
}

function Dazed({level}:(number|any)) {
  const group = useRef<any>()
  const { nodes, materials, animations,  }:any = useGLTF('/ThreeFile/Orange/Dazed.gltf') 
  const { actions, mixer, clips }:any = useAnimations(animations, group)


  
  useEffect(()=> {
    
    actions.dle05.play()    
    actions.Tree.play()
    actions.Fly.play()
    actions.Fly2.play()
    actions.Grass.play()
    actions.Grass2.play()
    actions.Whirligig1.play()
    actions.Whirligig2.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    // actions.Angry.clampWhenFinished = true
    // actions.Angry.loop = THREE.LoopOnce as any
    // actions.Angry.reset()
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
        
      {/* 레벨 1 */}
      <mesh name="Floor" geometry={nodes.Floor.geometry} material={materials.M_Environment_A} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <group name="Cat" position={[0, 1.31, 0.43]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.root} />
        <group name="Chibi_Cat">
          <skinnedMesh name="Mesh006" geometry={nodes.Mesh006.geometry} material={materials.M_Chibi_Cat_01} skeleton={nodes.Mesh006.skeleton} />
          <skinnedMesh name="Mesh006_1" geometry={nodes.Mesh006_1.geometry} material={materials.M_Chibi_Emo_01} skeleton={nodes.Mesh006_1.skeleton} />
        </group>
      </group>
        {
          level>=2?(<group name="Tree" position={[-0.63, 1.05, -0.94]} rotation={[1.58, 0.08, 0.22]} scale={0.01}>
            <primitive object={nodes.Tree_root} />
              <skinnedMesh name="TreeA" geometry={nodes.TreeA.geometry} material={materials['M_Environment_A.001']} skeleton={nodes.TreeA.skeleton} />
            </group>):null
        }
        {
          level>=3&&(
            <>
              <group name="Fly" position={[1.39, 1.61, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
                <primitive object={nodes.Butterfly_root} />
                <skinnedMesh name="Butterfly_A" geometry={nodes.Butterfly_A.geometry} material={materials.M_Butterfly_A} skeleton={nodes.Butterfly_A.skeleton} />
              </group>
              <group name="Fly2" position={[-0.72, 1.1, 0.71]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
                <primitive object={nodes.Butterfly_root_1} />
                <skinnedMesh name="Butterfly_A001" geometry={nodes.Butterfly_A001.geometry} material={materials['M_Butterfly_A.001']} skeleton={nodes.Butterfly_A001.skeleton} />
              </group>
              <group name="Grass" position={[-0.81, 1.1, 0.50]} rotation={[Math.PI / 2, 0, 0]} scale={0.008}>
                <primitive object={nodes.Grass_root} />
                <skinnedMesh name="Grass_A" geometry={nodes.Grass_A.geometry} material={materials['M_Environment_A.002']} skeleton={nodes.Grass_A.skeleton} />
              </group>
              <group name="Grass2" position={[1.41, 1.13, 0.57]} rotation={[Math.PI / 2, 0, 0]} scale={0.008}>
                <primitive object={nodes.Grass_root_1} />
                <skinnedMesh name="Grass_A001" geometry={nodes.Grass_A001.geometry} material={materials['M_Environment_A.003']} skeleton={nodes.Grass_A001.skeleton} />
              </group>
            </>
          )
        }
        
        {
          level>=4&&(
            <>
              <group name="Whirligig1" position={[1.88, 0.88, 0.14]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.Whirligig_root} />
                <skinnedMesh name="WhirligigObj1" geometry={nodes.WhirligigObj1.geometry} material={materials.M_Whirligig} skeleton={nodes.WhirligigObj1.skeleton} />
              </group>
              <group name="Whirligig2" position={[1.53, 0.92, -0.30]} rotation={[Math.PI / 2, 0, 0]} scale={0.015}>
                <primitive object={nodes.Whirligig_root_1} />
                <skinnedMesh name="WhirligigObj2" geometry={nodes.WhirligigObj2.geometry} material={materials['M_Whirligig.001']} skeleton={nodes.WhirligigObj2.skeleton} />
              </group>
            </>
          )
        }
        {
          level>=5&&(
            <group name="Bag" position={[0.82, 1.72, -0.24]} rotation={[1.9, -0.07, 2.95]} scale={0.011}>
              <primitive object={nodes.Bag_center} />
              <skinnedMesh name="BagObj" geometry={nodes.BagObj.geometry} material={materials.M_Bag_bread} skeleton={nodes.BagObj.skeleton} />
            </group>
          )
        }
        {
          level>=6&&(
            <>
              <mesh name="Mushroom_1" geometry={nodes.Mushroom_1.geometry} material={materials['M_Environment_A.004']} position={[-1.46, 1.11, 0.24]} rotation={[1.55, -0.34, 0.04]} scale={0.005} />
              <mesh name="Mushroom_2" geometry={nodes.Mushroom_2.geometry} material={materials['M_Environment_A.005']} position={[-1.54, 1.14, 0.27]} rotation={[1.5, 0.43, 2.46]} scale={0.005} />
            </>
          )
        }
        {
          level>=7&&(
            <group name="Wapon" position={[-1.51, 1.72, -0.61]} rotation={[2.08, 1.23, -2.23]} scale={0.01}>
              <primitive object={nodes.Baton_wood_center} />
              <skinnedMesh name="Wapon001" geometry={nodes.Wapon001.geometry} material={materials.M_Baton_wood} skeleton={nodes.Wapon001.skeleton} />
            </group>
          )
        }
        {
          level>=8&&(
            <group name="Hat" position={[-1.46, 2.29, -0.79]} rotation={[1.28, 0.97, 1.38]} scale={0.005}>
              <primitive object={nodes.Hiking_hat_root} />
              <skinnedMesh name="HatObj" geometry={nodes.HatObj.geometry} material={materials.M_Hiking_hat_A} skeleton={nodes.HatObj.skeleton} />
            </group>
          )
        }
        {
          level>=9&&(
            <>
              <mesh name="Fish" geometry={nodes.Fish.geometry} material={materials.M_Dried_fish} position={[-0.92, 1.36, -0.45]} rotation={[-0.25, -0.5, -0.11]} scale={0.01} />
              <mesh name="MeatA" geometry={nodes.MeatA.geometry} material={materials.M_MeatA} position={[-1.15, 1.46, -0.64]} rotation={[-0.87, -0.9, 2.41]} scale={0.01} />
            </>
          )
        }

      </group>
    </group>
  )
}

function Sad({level}:(number|any)) {
  const group = useRef<any>()
  const { nodes, materials, animations,  }:any = useGLTF('/ThreeFile/Orange/Sad.gltf') 
  const { actions, mixer, clips }:any = useAnimations(animations, group)


  
  useEffect(()=> {
    
    actions.dle05.play()    
    actions.Tree.play()
    actions.Fly.play()
    actions.Fly2.play()
    actions.Grass.play()
    actions.Grass2.play()
    actions.Whirligig1.play()
    actions.Whirligig2.play()

    // 애니메이션 종료 후에 actions 객체를 리셋합니다.
    // actions.Angry.clampWhenFinished = true
    // actions.Angry.loop = THREE.LoopOnce as any
    // actions.Angry.reset()
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
        
      {/* 레벨 1 */}
      <mesh name="Floor" geometry={nodes.Floor.geometry} material={materials.M_Environment_A} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <group name="Cat" position={[0, 1.31, 0.43]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.root} />
        <group name="Chibi_Cat">
          <skinnedMesh name="Mesh006" geometry={nodes.Mesh006.geometry} material={materials.M_Chibi_Cat_01} skeleton={nodes.Mesh006.skeleton} />
          <skinnedMesh name="Mesh006_1" geometry={nodes.Mesh006_1.geometry} material={materials.M_Chibi_Emo_01} skeleton={nodes.Mesh006_1.skeleton} />
        </group>
      </group>
        {
          level>=2?(<group name="Tree" position={[-0.63, 1.05, -0.94]} rotation={[1.58, 0.08, 0.22]} scale={0.01}>
            <primitive object={nodes.Tree_root} />
              <skinnedMesh name="TreeA" geometry={nodes.TreeA.geometry} material={materials['M_Environment_A.001']} skeleton={nodes.TreeA.skeleton} />
            </group>):null
        }
        {
          level>=3&&(
            <>
              <group name="Fly" position={[1.39, 1.61, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
                <primitive object={nodes.Butterfly_root} />
                <skinnedMesh name="Butterfly_A" geometry={nodes.Butterfly_A.geometry} material={materials.M_Butterfly_A} skeleton={nodes.Butterfly_A.skeleton} />
              </group>
              <group name="Fly2" position={[-0.72, 1.1, 0.71]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
                <primitive object={nodes.Butterfly_root_1} />
                <skinnedMesh name="Butterfly_A001" geometry={nodes.Butterfly_A001.geometry} material={materials['M_Butterfly_A.001']} skeleton={nodes.Butterfly_A001.skeleton} />
              </group>
              <group name="Grass" position={[-0.81, 1.1, 0.50]} rotation={[Math.PI / 2, 0, 0]} scale={0.008}>
                <primitive object={nodes.Grass_root} />
                <skinnedMesh name="Grass_A" geometry={nodes.Grass_A.geometry} material={materials['M_Environment_A.002']} skeleton={nodes.Grass_A.skeleton} />
              </group>
              <group name="Grass2" position={[1.41, 1.13, 0.57]} rotation={[Math.PI / 2, 0, 0]} scale={0.008}>
                <primitive object={nodes.Grass_root_1} />
                <skinnedMesh name="Grass_A001" geometry={nodes.Grass_A001.geometry} material={materials['M_Environment_A.003']} skeleton={nodes.Grass_A001.skeleton} />
              </group>
            </>
          )
        }
        
        {
          level>=4&&(
            <>
              <group name="Whirligig1" position={[1.88, 0.88, 0.14]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.Whirligig_root} />
                <skinnedMesh name="WhirligigObj1" geometry={nodes.WhirligigObj1.geometry} material={materials.M_Whirligig} skeleton={nodes.WhirligigObj1.skeleton} />
              </group>
              <group name="Whirligig2" position={[1.53, 0.92, -0.30]} rotation={[Math.PI / 2, 0, 0]} scale={0.015}>
                <primitive object={nodes.Whirligig_root_1} />
                <skinnedMesh name="WhirligigObj2" geometry={nodes.WhirligigObj2.geometry} material={materials['M_Whirligig.001']} skeleton={nodes.WhirligigObj2.skeleton} />
              </group>
            </>
          )
        }
        {
          level>=5&&(
            <group name="Bag" position={[0.82, 1.72, -0.24]} rotation={[1.9, -0.07, 2.95]} scale={0.011}>
              <primitive object={nodes.Bag_center} />
              <skinnedMesh name="BagObj" geometry={nodes.BagObj.geometry} material={materials.M_Bag_bread} skeleton={nodes.BagObj.skeleton} />
            </group>
          )
        }
        {
          level>=6&&(
            <>
              <mesh name="Mushroom_1" geometry={nodes.Mushroom_1.geometry} material={materials['M_Environment_A.004']} position={[-1.46, 1.11, 0.24]} rotation={[1.55, -0.34, 0.04]} scale={0.005} />
              <mesh name="Mushroom_2" geometry={nodes.Mushroom_2.geometry} material={materials['M_Environment_A.005']} position={[-1.54, 1.14, 0.27]} rotation={[1.5, 0.43, 2.46]} scale={0.005} />
            </>
          )
        }
        {
          level>=7&&(
            <group name="Wapon" position={[-1.51, 1.72, -0.61]} rotation={[2.08, 1.23, -2.23]} scale={0.01}>
              <primitive object={nodes.Baton_wood_center} />
              <skinnedMesh name="Wapon001" geometry={nodes.Wapon001.geometry} material={materials.M_Baton_wood} skeleton={nodes.Wapon001.skeleton} />
            </group>
          )
        }
        {
          level>=8&&(
            <group name="Hat" position={[-1.46, 2.29, -0.79]} rotation={[1.28, 0.97, 1.38]} scale={0.005}>
              <primitive object={nodes.Hiking_hat_root} />
              <skinnedMesh name="HatObj" geometry={nodes.HatObj.geometry} material={materials.M_Hiking_hat_A} skeleton={nodes.HatObj.skeleton} />
            </group>
          )
        }
        {
          level>=9&&(
            <>
              <mesh name="Fish" geometry={nodes.Fish.geometry} material={materials.M_Dried_fish} position={[-0.92, 1.36, -0.45]} rotation={[-0.25, -0.5, -0.11]} scale={0.01} />
              <mesh name="MeatA" geometry={nodes.MeatA.geometry} material={materials.M_MeatA} position={[-1.15, 1.46, -0.64]} rotation={[-0.87, -0.9, 2.41]} scale={0.01} />
            </>
          )
        }

      </group>
    </group>
  )
}