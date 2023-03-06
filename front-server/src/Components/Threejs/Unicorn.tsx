import {Suspense, useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Unicorn() {
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

export default Unicorn;


function Model() {
  const ref = useRef<any>()
  const { nodes, materials }:any = useGLTF('/ThreeFile/unicorn.gltf')
  return (
    <group ref={ref} dispose={null}>
      <group rotation={[-1.37, -0.01, -3.14]} scale={0.5}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_12.geometry} material={materials.Rainbow_2} position={[0, 2.31, 0.05]} rotation={[0.28, 0, 0]} scale={1.12} />
          <mesh geometry={nodes.Object_14.geometry} material={materials.Rainbow_3} position={[0, 2.03, 0.39]} rotation={[0.84, 0, 0]} scale={0.93} />
          <mesh geometry={nodes.Object_16.geometry} material={materials.Rainbow_4} position={[0, 1.63, 0.57]} rotation={[1.25, 0, 0]} scale={0.76} />
          <mesh geometry={nodes.Object_8.geometry} material={materials.Rainbow_1} position={[0, 2.41, -0.47]} rotation={[-0.26, 0, 0]} />
          <mesh geometry={nodes.Object_18.geometry} material={materials.Rainbow_5} position={[0, 0.79, 1.4]} scale={0.78} />
          <mesh geometry={nodes.Object_22.geometry} material={materials.Horn} position={[0.04, 2.05, -1.12]} rotation={[-0.8, 0, 0]} scale={1.47} />
          <mesh geometry={nodes.Object_10.geometry} material={materials['Material.005']} position={[0, -0.14, -0.02]} />
          <mesh geometry={nodes.Object_6.geometry} material={materials['Material.005']} position={[0, 0.75, 0.62]} rotation={[0.17, 0, 0]} scale={[0.7, 0.7, 0.95]} />
          <mesh geometry={nodes.Object_20.geometry} material={materials.Eyes} scale={0.24} />
          <mesh geometry={nodes.Object_4.geometry} material={materials['Material.005']} position={[0, 1.66, -0.53]} scale={[1, 1, 1.14]} />
        </group>
      </group>
    </group>
  )
}

