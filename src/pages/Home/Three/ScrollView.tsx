import {
  AccumulativeShadows,
  OrbitControls,
  PivotControls,
  RandomizedLight,
  useScroll,
  PerspectiveCamera,
  useHelper,
  RoundedBox,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier";
import ResizeContainer from "components/ResizeContainer";
import { useEffect, useRef, useState } from "react";
import {
  CameraHelper,
  PerspectiveCamera as PerspectiveCameraType,
} from "three";
import useScrollEqual from "utils/hooks/useScrollEqual";
import CS from "./CS";
import Earth from "./Earth";
import Hats from "./Hats";
import SDU from "./SDU";
import cameraRotate from 'utils/cameraRotate'

interface propsType {
  zoom: number;
}


export default function ScrollView(props: propsType) {
  const { zoom } = props;

  const [showHats, setshowHats] = useState(false);
  const [haveEarth, setHaveEarth] = useState(false);

  const scroll = useScroll();

  const { set } = useThree();

  const camera = useRef<PerspectiveCameraType>();

  const isEqual = useScrollEqual();

  useFrame((s,d) => {
    if (!isEqual(scroll.offset)) {
      if (scroll.visible(0, 0.4 / 3)) {
        const num = scroll.range(0, 0.4 / 3);
        camera.current!.position.set(zoom, (20 + num * 7) * zoom, -2 * zoom);
        camera.current!.lookAt(zoom, 0, -2 * zoom);
      } else if (scroll.visible(0.6 / 3, 0.7 / 3)) {
        const num = scroll.range(0.6 / 3, 0.7 / 3);
        camera.current!.rotation.set(
          -1.57 - 0.28 * num,
          -0.5 * num,
          -2.11 * num
        );
        camera.current!.position.set(
          (1 - 12.42 * num) * zoom,
          (25.53 - 4.01 * num) * zoom,
          (-2 - 5.21 * num) * zoom
        );
      } else if (scroll.visible(0.7 / 3, 1.4 / 3) && scroll.offset < 2.1 / 3) {
        const num = scroll.range(0.7 / 3, 1.4 / 3);
        camera.current!.rotation.set(-1.57 - 0.28, -0.5, -2.11);
        camera.current!.position.set(
          (1 - 31 * num) * zoom,
          (25.53 - 10 * num) * zoom,
          (-2 - 13 * num) * zoom
          );
          camera.current!.lookAt((1 - num) * zoom, 0, (2 * num - 2) * zoom);
        setHaveEarth(false);
      } else if (scroll.visible(2.3 / 3, 3 / 3)) {
        setHaveEarth(true);
        const num = scroll.range(2.3 / 3, 3 / 3);
        camera.current!.position.set(
          -30 * zoom,
          (15.53 - 40 * num) * zoom,
          -15 * zoom
        );
      }
      set({ camera: camera.current! });
      setshowHats(scroll.offset > 2 / 3);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />

      <PerspectiveCamera
        makeDefault={false}
        near={5}
        far={80}
        fov={12 / zoom}
        ref={camera}
      >
        <meshBasicMaterial />
      </PerspectiveCamera>

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
            name="cs"
            type="fixed"
            scale={[1.5, 1, 1.5]}
            position={[1, 0, -2]}
            includeInvisible
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
      {haveEarth && <Earth />}
    </>
  );
}
