import { useGLTF, useScroll } from "@react-three/drei";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import staticColor from "static/color/staticColors";

interface propsType extends MeshProps {}

export default function CS(props: propsType) {
  const { ...otherProps } = props;
  const { nodes, materials } = useGLTF("/glbs/cs.glb") as any;
  const { scene } = useThree();

  const scroll = useScroll();

  useEffect(() => {
    console.log(scene);
    
  }, []);

  useFrame((s, d) => {
    if (scroll.visible(0, 1 / 3)) {
      const num = scroll.range(0, 1 / 3);
    }
  });

  return (
    <>
      <mesh
        name="cs_circle"
        {...otherProps}
        rotation={[(Math.PI * 0.98) / 2, 0, 0]}
        position={[0, -0.5, 0.5]}
        scale={[1, 0.5, 1]}
        receiveShadow
        castShadow
        geometry={nodes.circle.geometry}
      >
        <meshPhysicalMaterial color={staticColor} roughness={1} />
      </mesh>
      <mesh
        {...otherProps}
        receiveShadow
        castShadow
        geometry={nodes.sd.geometry}
      >
        <meshPhysicalMaterial color={staticColor} roughness={1} />
      </mesh>
    </>
  );
}
