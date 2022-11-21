import { useFrame } from "@react-three/fiber";

export default function Cubic() {
  useFrame((s, d) => {});
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}
