import { Camera } from "@react-three/fiber";
import { Vector3 } from "three";

export default function cameraRotate(
  camera: Camera,
  time: number,
  speed: number = 1,
  origin: Vector3 = new Vector3(0, 0, 0),
) {
  const x = camera.position.x - origin.x,
    z = camera.position.z - origin.z,
    y = camera.position.y,
    angle = (time * speed * Math.PI) / 360;

  camera.position.set(
    Math.cos(angle) * x - Math.sin(angle) * z + origin.x,
    y,
    Math.cos(angle) * z + Math.sin(angle) * x + origin.z
  );
  camera.lookAt(origin);
}
