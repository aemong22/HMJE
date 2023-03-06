import {Suspense, useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Rabbit() {
  return (
    <div>
      <div className='h-screen w-screen'>
        <Canvas style={{height: '100vh', width: '100vw'}}>
          <mesh scale={1} position={[0,0,0]}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.8} />
              <spotLight intensity={0.1} angle={0.1} penumbra={1} position={[10,5,3]} castShadow/>
                <Model/>
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true}/>
            </Suspense>
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}

export default Rabbit;


function Model() {
  const ref = useRef<any>()
  const { nodes, materials }:any = useGLTF('/ThreeFile/rabbit.gltf')
  return (
    <group ref={ref} dispose={null}>
      <group rotation={[-Math.PI / 2.3, 0, 0]} scale={0.5}>
      <mesh geometry={nodes.Object_2.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.Object_3.geometry} material={materials['Material.002']} />
        <mesh geometry={nodes.Object_4.geometry} material={materials['Material.003']} />
      </group>
    </group>
  )
}

