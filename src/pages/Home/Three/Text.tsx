import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Motto1, Motto2 } from "static/icon/SchoolMotto";
import useScrollEqual from "utils/hooks/useScrollEqual";

export default function Text() {
  const scroll = useScroll();
  const isEqual = useScrollEqual();
  const [visible, setvisible] = useState(false);

  useFrame(() => {
    if (!isEqual(scroll.offset)) {
      setvisible(scroll.visible(0, 0.01));

      if (scroll.visible(1.1 / 3, 1.2 / 3)) {
      } else if (scroll.visible(1.2 / 3, 2 / 3) && scroll.offset < 0.99) {
      }
    }
  });
  return (
    <>
      <Motto1 size={0.3} isActive={visible} />
      <Motto2 size={0.3} isActive={visible} />
    </>
  );
}
