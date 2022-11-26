import { useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import staticColor from "static/color/staticColors";

interface SDUPropsType extends MeshProps {}

export default function SDU(props: SDUPropsType) {
  const { nodes } = useGLTF("/glbs/sdu.glb") as any;
  return (
    <mesh {...props} receiveShadow castShadow geometry={nodes.sdu.geometry}>
      <meshPhysicalMaterial color={staticColor} roughness={1} />
    </mesh>
  );
}
