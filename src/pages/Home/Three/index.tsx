import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cubic from "./Cubic";
// import { useRef } from "react";

export default function Three() {
  
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cubic/>
      <OrbitControls />
    </Canvas>
  );
}
