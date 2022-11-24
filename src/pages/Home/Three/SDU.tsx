import { useGLTF } from "@react-three/drei";
import staticColor from "static/color/staticColors";

export default function SDU() {
  const { nodes} = useGLTF("/glbs/sdu.glb") as any;
  return (
    <mesh
      receiveShadow
      castShadow
      geometry={nodes.sdu.geometry}
    >
      <meshPhysicalMaterial
        color={staticColor}
        roughness={1}
      />
    </mesh>
  );
}
