import { useAnimations, useGLTF } from "@react-three/drei";
import { PrimitiveProps, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import staticColor from "static/color/staticColors";
import * as THREE from "three";

interface propsType extends Omit<PrimitiveProps, "object"> {}

export default function CS(props: propsType) {
  const { clock } = useThree();
  const beginT = useRef(0);
  const { nodes, materials, scene, animations } = useGLTF(
    "/glbs/cs.glb"
  ) as any;

  const { actions } = useAnimations(animations, scene);
  useEffect(() => {
    beginT.current = clock.elapsedTime;
  }, []);

  useEffect(
    () => void (actions["circleAction.001"]!.play().paused = true),
    [actions]
  );

  useFrame((s, d) => {
    
    const action = actions["circleAction.001"];
    action!.time =
      // (clock.elapsedTime-beginT.current)%animations[0].duration
      0;
  });
  return (
    <>
      <primitive object={scene} receiveShadow castShadow></primitive>
    </>
  );
}
