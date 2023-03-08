import {Suspense, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

function Gaming() {
  return (
    <div>
      <Canvas>
        <mesh scale={4} position={[0,-1,0]}>
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

export default Gaming;


function Model() {
  const group = useRef<any>()
  const { nodes, materials, animations }:any = useGLTF('/ThreeFile/Gaming.gltf')
  console.log('애니메이션',animations[0]);
  
  const { actions, mixer }:any = useAnimations(animations, group)
  // console.log('액션',actions);
  useFrame((actions) => {
    group.current.rotation.y = actions.clock.getElapsedTime()
  })

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" position={[0, 0, 0.11]} rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="ItemBox_Glass001_11" position={[0.16, 0.99, -0.18]} scale={0.33}>
                <mesh name="Object_33" geometry={nodes.Object_33.geometry} material={materials['Glass.002']} />
              </group>
              <group name="ItemBox_Glass002_10" position={[-0.19, 0.43, -0.56]} scale={0.33}>
                <mesh name="Object_31" geometry={nodes.Object_31.geometry} material={materials['Glass.002']} />
              </group>
              <group name="ItemBox_Glass_12" position={[-0.16, 0.74, 0.25]} scale={0.33}>
                <mesh name="Object_35" geometry={nodes.Object_35.geometry} material={materials['Glass.002']} />
              </group>
              <group name="ItemBox_InsideColors001_8" position={[0.16, 0.99, -0.18]} scale={0.33}>
                <mesh name="Object_27" geometry={nodes.Object_27.geometry} material={materials['ItemBox_InsideColors.002']} />
              </group>
              <group name="ItemBox_InsideColors002_7" position={[-0.19, 0.43, -0.56]} scale={0.33}>
                <mesh name="Object_25" geometry={nodes.Object_25.geometry} material={materials['ItemBox_InsideColors.002']} />
              </group>
              <group name="ItemBox_InsideColors_9" position={[-0.16, 0.74, 0.25]} scale={0.33}>
                <mesh name="Object_29" geometry={nodes.Object_29.geometry} material={materials['ItemBox_InsideColors.002']} />
              </group>
              <group name="ITG_Arrow_6" position={[0.32, 0.41, 0.26]}>
                <mesh name="Object_21" geometry={nodes.Object_21.geometry} material={materials['OUTLINE.002']} />
                <mesh name="Object_22" geometry={nodes.Object_22.geometry} material={materials['OUTLINE.002']} />
                <mesh name="Object_23" geometry={nodes.Object_23.geometry} material={materials['ITG_Arrow-Painted.002']} />
              </group>
              <group name="MK8_Question-Mark001_4" position={[0.16, 1, -0.18]} rotation={[-0.66, -0.86, -0.51]}>
                <mesh name="Object_17" geometry={nodes.Object_17.geometry} material={materials['REF-ItemBoxMK8.002']} />
              </group>
              <group name="MK8_Question-Mark002_3" position={[-0.19, 0.43, -0.56]} rotation={[-0.66, -0.86, -0.51]}>
                <mesh name="Object_15" geometry={nodes.Object_15.geometry} material={materials['REF-ItemBoxMK8.002']} />
              </group>
              <group name="MK8_Question-Mark_5" position={[-0.16, 0.74, 0.25]} rotation={[-0.66, -0.86, -0.51]}>
                <mesh name="Object_19" geometry={nodes.Object_19.geometry} material={materials['REF-ItemBoxMK8.002']} />
              </group>
              <group name="MusicNote2_1" position={[-0.5, 0.33, -0.16]} rotation={[-0.11, 0.03, 0.22]}>
                <mesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials['OUTLINE.002']} />
                <mesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials['SRG_Color2.002']} />
              </group>
              <group name="MusicNote_2" position={[0.41, 0.24, -0.42]}>
                <mesh name="Object_12" geometry={nodes.Object_12.geometry} material={materials['SRG_Color2.002']} />
                <mesh name="Object_13" geometry={nodes.Object_13.geometry} material={materials['OUTLINE.002']} />
              </group>
              <group name="SRG-io_SU_0" position={[0, 0.06, -0.06]} rotation={[-0.14, -0.16, -0.01]}>
                <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials['SRGio-Painted.002']} />
                <mesh name="Object_5" geometry={nodes.Object_5.geometry} material={materials['OUTLINE.002']} />
                <mesh name="Object_6" geometry={nodes.Object_6.geometry} material={materials['WHITE.002']} />
                <mesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials['BLACK.002']} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}