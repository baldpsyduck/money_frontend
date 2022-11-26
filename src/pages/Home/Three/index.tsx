import {
  Environment,
  Lightformer,
  OrbitControls,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAppSelector } from "store/hooks";
import ScrollView from "./ScrollView";
import styled from "@emotion/styled";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

export default function Three() {
  const theme = useAppSelector((s) => s.style.style);
  const zoom = useAppSelector((s) => s.size.zoom);
  return (
    <Container
      shadows
      gl={{ antialias: false }}
      camera={{ position: [1, 35,-2], near: 30, far: 55, fov: 7 }}
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
      <ScrollControls pages={0.1}>
        <ScrollView zoom={zoom} />
      </ScrollControls>
      {/* Effects */}
      <EffectComposer>
        <DepthOfField target={[0, 0, 0]} bokehScale={3} />
      </EffectComposer>
      {/* Controls */}
    </Container>
  );
}

const Container = styled(Canvas)`
  width: 100vw;
  height: 100vh;
`;
