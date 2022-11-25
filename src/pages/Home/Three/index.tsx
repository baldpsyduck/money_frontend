import {
  OrbitControls,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAppSelector } from "store/hooks";
import ScrollOne from './ScrollOne'
import styled from "@emotion/styled";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

export default function Three() {
  const theme = useAppSelector((s) => s.style.style);
  const zoom = useAppSelector((s) => s.size.zoom);
  return (
    <Container
      shadows
      gl={{ antialias: false }}
      camera={{ position: [-30, 35, -15], near: 30, far: 55, fov: 12 }}
    >
      {/* Lighting, environment and colors */}
      <color attach="background" args={[theme.basic]} />
     <ScrollControls>
      <Scroll>
        <ScrollOne zoom={zoom}/>
      </Scroll>
      <Scroll html>
        <div>
          123
        </div>
      </Scroll>
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
