import styled from "@emotion/styled";
import Three from "./Three";
export default function Home() {
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
