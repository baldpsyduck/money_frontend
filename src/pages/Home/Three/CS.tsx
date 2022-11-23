import { useGLTF } from "@react-three/drei";
import staticColor from "static/color/staticColors";

export default function CS() {
  const { nodes } = useGLTF("/glbs/cs.glb") as any;
  return (
    <mesh receiveShadow castShadow geometry={nodes.cs.geometry}>
      <meshPhysicalMaterial color={staticColor} roughness={1} />
    </mesh>
  );
}
