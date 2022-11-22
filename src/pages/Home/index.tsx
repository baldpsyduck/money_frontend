import styled from "@emotion/styled";
import Three from "./Three";
import { useState } from "react";
export default function Home() {

  const [active,setactive]=useState(true)
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
  top:-3.5rem;
`;
