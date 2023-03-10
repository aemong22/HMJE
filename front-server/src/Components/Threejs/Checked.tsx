import {Suspense, useEffect, useRef, useState} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

function Checked() {
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

export default Checked;



function Model(props:any) {
  const group = useRef()
  const { nodes, materials, animations }:any = useGLTF<any>('/ThreeFile/Test.gltf')
  // const { actions, mixer }:any = useAnimations(animations, group)

  // useEffect(()=> {
  //   console.log(actions);
    
  //   actions.Animation.play()
  // }, [mixer])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Clownfish" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="Rig" rotation={[-1.57, 0, 0]} scale={100}>
            <group name="root">
              <primitive object={nodes.body} />
              <skinnedMesh name="Mesh" geometry={nodes.Mesh.geometry} material={materials['M_Clownfish.004']} skeleton={nodes.Mesh.skeleton} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}