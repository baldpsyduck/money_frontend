import {
  Environment,
  Lightformer,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAppSelector } from "store/hooks";
import ScrollView from "./ScrollView";
import styled from "@emotion/styled";
import Text from './Text';

export default function Three() {
  const theme = useAppSelector((s) => s.style.style);
  const zoom = useAppSelector((s) => s.size.zoom);
  return (
    <Container
      shadows
      gl={{ antialias: false }}
      camera={{ position: [-60, 70, -30], near: 30, far: 200, fov: 80 }}
      
    >
      <Environment resolution={32}>
        <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
        <Lightformer position={[10, 0, -10]} scale={10} intensity={6} />
        <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
      </Environment>

      <directionalLight
        position={[-10, 10, 5]}
        shadow-mapSize={[256, 256]}
        shadow-bias={-0.0001}
        castShadow
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
      </directionalLight>
      {/* Lighting, environment and colors */}
      <color attach="background" args={[theme.basic]} />
      <ScrollControls pages={2.5}>
        <ScrollView zoom={zoom} />
        <Scroll html>
          <Text />
        </Scroll>
      </ScrollControls>
      {/* Controls */}
    </Container>
  );
}

const Container = styled(Canvas)`
  width: 100vw;
  height: 100vh;
`;
