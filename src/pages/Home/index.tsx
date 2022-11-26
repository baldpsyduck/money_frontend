import styled from "@emotion/styled";
import { useState } from "react";
import { Motto1, Motto2 } from "static/icon/SchoolMotto";
import Three from "./Three";
export default function Home() {
  const [visible, setvisible] = useState(false);
  return (
    <Container>
      <Three />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: -3.5rem;
`;
