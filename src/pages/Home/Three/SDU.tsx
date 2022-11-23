import { useGLTF } from "@react-three/drei";
import staticColor from "static/color/staticColors";

export default function SDU() {
  const { nodes, materials } = useGLTF("/glbs/sdu.glb") as any;
  return (
    <mesh
      receiveShadow
      castShadow
      geometry={nodes.sdu.geometry}
      material={materials.material}
    >
      <meshPhysicalMaterial
        color={staticColor}
        thickness={10}
        roughness={0.65}
      />
    </mesh>
  );
}
