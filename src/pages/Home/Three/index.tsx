import {
  AccumulativeShadows,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAppSelector } from "store/hooks";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import SDU from "./SDU";

import Hats from "./Hats";
import styled from "@emotion/styled";
import CS from "./CS";
import { useEffect, useRef } from "react";

export default function Three() {

  const theme = useAppSelector((s) => s.style.style);
  const width=useAppSelector((s) => s.size.width);

  const proportion=useRef(width/2048)

  useEffect(() => {
     proportion.current=width/2048;
  },[width])

  return (
    <Container
      shadows
      gl={{ antialias: false }}
      camera={{ position: [-30, 35, -15], near: 30, far: 55, fov: 12 }}
    >
      {/* Lighting, environment and colors */}
      <color attach="background" args={[theme.basic]} />
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[-10, 10, 5]}
        shadow-mapSize={[256, 256]}
        shadow-bias={-0.0001}
        castShadow
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
      </directionalLight>
      <Environment resolution={32}>
        <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
        <Lightformer position={[10, 0, -10]} scale={10} intensity={6} />
        <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
      </Environment>
      {/* Moon physics */}
      <Physics gravity={[0, -4, 0]}>
        <Hats count={50} />
        <RigidBody
          type="fixed"
          rotation={[Math.PI / 2, 0, (Math.PI * 3) / 4]}
          scale={[2, 2, 2]}
          position={[5, 0, 1]}
        >
          <SDU />
        </RigidBody>
        <RigidBody
          type="fixed"
          rotation={[0, 0, 0]}
          scale={[1.5, 1, 1.5]}
          position={[1, 0, -2]}
        >
          <CS />
        </RigidBody>
        <RigidBody position={[0, -1, 0]} type="fixed" colliders={false}>
          <CuboidCollider restitution={0.1} args={[1000, 1, 1000]} />
        </RigidBody>
      </Physics>
      {/* Soft shadows, they stop rendering after 1500 frames */}
      <AccumulativeShadows
        temporal
        frames={Infinity}
        alphaTest={1}
        blend={200}
        limit={1500}
        scale={25}
        position={[0, -0.05, 0]}
      >
        <RandomizedLight
          amount={1}
          mapSize={512}
          radius={5}
          ambient={0.5}
          position={[-10, 10, 5]}
          size={10}
          bias={0.001}
        />
      </AccumulativeShadows>
      {/* Effects */}
      <EffectComposer>
        <DepthOfField target={[0, 0, 0]} bokehScale={3} />
      </EffectComposer>
      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.1}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 4}
      />
    </Container>
  );
}

const Container = styled(Canvas)`
  width: 100vw;
  height: 100vh;
`;

