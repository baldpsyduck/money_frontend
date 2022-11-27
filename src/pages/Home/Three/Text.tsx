import styled from "@emotion/styled";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import useScrollEqual from "utils/hooks/useScrollEqual";

export default function Text() {
  const scroll = useScroll();
  const isEqual = useScrollEqual();
  const [visible, setvisible] = useState(false);

  useFrame(() => {
    if (!isEqual(scroll.offset)) {
      setvisible(scroll.offset > 0.98);
    }
  });
  return (
    <Cointainer>
      <Text1 theme={{ left: visible ? 0 : -70 }}>每年</Text1>
      <Text2 theme={{ visible: visible }}>
        300
        <Text3>人</Text3>
      </Text2>
      <Text4>
        <Text7 theme={{ right: visible ? 0 : -70 }}>会在计科</Text7>
        <Text5 theme={{ visible: visible }}>毕</Text5>
        <Text6 theme={{ visible: visible }}>业</Text6>
      </Text4>
    </Cointainer>
  );
}

const Cointainer = styled.div`
  position: absolute;
  width: 200px;
  height: 120px;
  top: 200vh;
  left: 80vw;
  display: flex;
  overflow: hidden;
`;

const Text1 = styled.div`
  font-size: 30px;
  border-top: 5px solid white;
  padding: 5px;
  transition: all 0.3s;
  left: ${(p) => (p.theme as any).left}px;
  position: absolute;
`;

const Text2 = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 60px;
  transition: all 0.5s 0.3s;
  font-weight: bold;
  ${(p) => ((p.theme as any).visible ? "" : "color:transparent;")}
  display:flex;
  align-items: flex-end;
`;

const Text3 = styled.div`
  font-size: 10px;
`;

const Text4 = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  height: 70px;
  display: flex;
`;

const Text5 = styled(Text2)`
  font-size: 35px;
  font-weight: bold;
  position: static;
  transition: all 0.8s 0.8s;
`;

const Text6 = styled(Text5)`
  transition: all 0.8s 0.8s;
`;
const Text7 = styled.div`
  position: absolute;
  transition: all 0.5s 0.3s;
  right: ${(p) => (p.theme as any).right}px;
`;
