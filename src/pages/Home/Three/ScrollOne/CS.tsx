import { useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import staticColor from "static/color/staticColors";

interface propsType extends MeshProps {
}

export default function CS(props: propsType) {
  const { nodes } = useGLTF("/glbs/cs.glb") as any;
  return (
    <mesh {...props} receiveShadow castShadow geometry={nodes.cs.geometry}>
      <meshPhysicalMaterial color={staticColor} roughness={1} />
    </mesh>
  );
}
