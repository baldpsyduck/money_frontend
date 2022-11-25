import {
  AccumulativeShadows,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import ResizeContainer from "components/ResizeContainer";
import { useEffect } from "react";
import CS from "./CS";
import Hats from "./Hats";
import SDU from "./SDU";
import cameraRotate from "utils/cameraRotate";

interface propsType {
  zoom: number;
}

export default function ScrollOne(props: propsType) {
  const { zoom } = props;
  const scroll = useScroll();

  useEffect(() => {
    console.log(scroll);
  }, [scroll]);

  useFrame((s, d) => {
    console.log(s);
    const offset = 1 - scroll.offset;
    if (offset !== 1)
      s.camera.position.set(
        Math.sin(offset) * -30,
        Math.atan(offset * Math.PI * 2) * 35,
        Math.cos((offset * Math.PI) / 3) * -15
      );
    else cameraRotate(s.camera, d,5);
    s.camera.lookAt(0, 0, 0);
  });

  return (
    <>
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
        <Hats count={50} zoom={zoom} />

        <ResizeContainer zoom={zoom}>
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
        </ResizeContainer>
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
    </>
  );
}
