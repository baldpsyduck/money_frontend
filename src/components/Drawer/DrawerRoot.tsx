import styled from "@emotion/styled";
import { HTMLProps, useState } from "react";
import AniContainer from "style/AniContainer";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { changeShow } from "store/features/drawer";
import getCss from "utils/getCss";

interface propsType extends HTMLProps<HTMLDivElement> {
  position: "left" | "right" | "top" | "bottom";
}

export default function Drawer(props: propsType) {
  const { children, ...otherProps } = props;
  const dispatch = useAppDispatch();
  const { show } = useAppSelector((s) => s.drawer);
  const [childContainer, setChildContainer] = useState<any>(null);
  const theme = useAppSelector((s) => s.style.style);
  /* 

  */

  return (
    <Container
      theme={{
        background: show ? "rgba(64, 64, 64, 0.5)" : "transparent",
        height: show ? "100%" : "0%",
        show: show,
      }}
      onClick={() => {
        dispatch(changeShow(false));
      }}
      {...(otherProps as any)}
    >
      <ChildContainer
        id="my-drawer-root"
        theme={{
          left: show ? "0px" : -childContainer?.clientWidth + "px",
          background: theme.basic,
        }}
        ref={(a) => {
          setChildContainer(a);
          return null;
        }}
      />
    </Container>
  );
}

Drawer.defaultProps = {
  position: "left",
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  ${(props) => getCss(props.theme)}
  transition: 300ms background,0s ${(props) =>
    (props.theme as any).show ? 0 : 300}ms height;
`;

const ChildContainer = styled(AniContainer)`
  height: 100%;
  position: absolute;
  background-color: black;
  ${(props) => getCss(props.theme)}
`;
