import { Addition, Brush } from "@react-three/csg";
import { useGLTF } from "@react-three/drei";
import { InstancedRigidBodies, Vector3Array } from "@react-three/rapier";
import { MathUtils } from "three";

export default function Hats({ count = 80, rand = MathUtils.randFloatSpread }) {
    const { nodes, materials } = useGLTF("/glbs/hat.glb") as any;
    const positions: Vector3Array[] = Array.from({ length: count }, (_, i) => [
      rand(2) + 1,
      10 + i / 2,
      rand(2) - 2,
    ]);
    const rotations: Vector3Array[] = Array.from({ length: count }, () => [
      Math.random(),
      Math.random(),
      Math.random(),
    ]);
    return (
      <InstancedRigidBodies
        positions={positions}
        rotations={rotations}
        colliders="hull"
      >
        <instancedMesh
          receiveShadow
          castShadow
          args={[undefined, undefined, count]}
          dispose={null}
        >
          {/* Merging the hat into one clump bc instances need a single geometry to function */}
          <Addition useGroups>
            <Brush
              a
              geometry={nodes.Plane006.geometry}
              material={materials.Material}
            />
            <Brush
              b
              geometry={nodes.Plane006_1.geometry}
              material={materials.boxCap}
            />
          </Addition>
        </instancedMesh>
      </InstancedRigidBodies>
    );
  }
  