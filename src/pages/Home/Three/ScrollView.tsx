import {
  AccumulativeShadows,
  OrbitControls,
  RandomizedLight,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import ResizeContainer from "components/ResizeContainer";
import { useEffect, useState } from "react";
import CS from "./CS";
import Hats from "./Hats";
import SDU from "./SDU";

interface propsType {
  zoom: number;
}

export default function ScrollView(props: propsType) {
  const { zoom } = props;

  const [showHats, setshowHats] = useState(false);

  const scroll = useScroll();

  const {camera}=useThree()

  useEffect(() => {
    camera.rotation.set(0,0,0);
    camera.lookAt(1*zoom, 0, -2*zoom)
  },[])

  useFrame(() => {
    setshowHats(scroll.offset > 0.98);
  });

  return (
    <>
      <ambientLight intensity={0.5} />

      {showHats && (
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 4}
        />
      )}

      {/* Moon physics */}
      <Physics gravity={[0, -4, 0]}>
        {showHats && <Hats count={50} zoom={zoom} />}

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
            rotation={zoom<1?[0, 5.99*Math.PI / 7, 0]:[0,0,0]}
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
