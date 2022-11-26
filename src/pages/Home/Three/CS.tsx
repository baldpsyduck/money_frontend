import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { PrimitiveProps, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

interface propsType extends Omit<PrimitiveProps, "object"> {}

export default function CS(props: propsType) {
  const { ...otherProps } = props;
  const { clock } = useThree();
  const beginT = useRef(0);
  const { scene, animations } = useGLTF("/glbs/cs.glb") as any;

  const { actions } = useAnimations(animations, scene);

  const scroll = useScroll();

  useEffect(() => {
    beginT.current = clock.elapsedTime;
  }, []);

  useEffect(
    () => void (actions["circleAction.001"]!.play().paused = true),
    [actions]
  );

  useFrame((s, d) => {
    const action = actions["circleAction.001"];
    action!.time = animations[0].duration * scroll.range(0, 1 / 3) ;
  });
  return (
    <>
      <primitive object={scene} receiveShadow castShadow></primitive>
    </>
  );
}
