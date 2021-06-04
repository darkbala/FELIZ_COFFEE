import React, { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { useGLTF, OrbitControls } from 'drei'
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {},
})
 
function Bottle() {
  const ref = useRef()
  const snap = useProxy(state)
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("2 varrr.gltf")

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  // Cursor showing current color
  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = ``
    const auto = ``
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh geometry={nodes.shoe_1.geometry} material={materials.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  )
}

function Picker() {
  return <></>
}

export default function App() {
  return (
    <>
      <Canvas>
       
        {/* <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} /> */}
        {/* <Suspense fallback={null}> */}
          <Bottle />
          {/* <Environment files="royal_esplanade_1k.hdr" /> */}
       
        {/* <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} /> */}
      </Canvas>
      <Picker />
    </>
  )
}
