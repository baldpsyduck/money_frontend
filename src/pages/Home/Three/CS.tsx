import { useGLTF, useScroll } from "@react-three/drei";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import staticColor from "static/color/staticColors";
import getThreeChild from "utils/getThreeChild";
import useScrollEqual from "utils/hooks/useScrollEqual";

interface propsType extends MeshProps {}

export default function CS(props: propsType) {
  const { ...otherProps } = props;
  const { nodes } = useGLTF("/glbs/cs.glb") as any;
  const { scene } = useThree();

  const scroll = useScroll();

  const isEqual = useScrollEqual();

  useEffect(() => {}, []);

  useFrame((s, d) => {
    if (!isEqual(scroll.offset)) {
      if (scroll.visible(0, 1 / 3, 0.1)) {
        const num = scroll.range(0, 1 / 3);
        const { children, index } = getThreeChild(scene, ["cs", "cs_circle"]);
        console.log(scene);
        if (children) {
          children[index].position.set(0, -0.5 + num * 0.5, 0.5 - 0.5 * num);
          children[index].rotation.set(
            ((Math.PI * 0.98) / 2) * (1 - num),
            0,
            0
          );
          children[index].scale.set(1, 0.5 + 0.5 * num, 1);
        }
        // if (mesh) {
        // }
      }
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
      <mesh visible={false} geometry={nodes.circle.geometry}>
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
