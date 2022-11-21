import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { routes } from "router";
import { useAppSelector } from "store/hooks";
import useMap from "utils/hooks/useMap";
import basicColor from "static/color/staticColors";

export default function DrawerInner() {
  const themeColor = useAppSelector((s) => s.style.style);

  const [_, mapNodes] = useMap();
  return (
    <Container>
      {mapNodes(routes, "drawerlink", (r, key, idx) => {
        if (idx < routes.length - 2)
          return (
            <MyLink theme={{ color: themeColor.text }} to={r.path} key={key}>
              {r.name}
            </MyLink>
          );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .active {
    background-color: rgba(255, 193, 31,0.5);
    border-right: 5px solid ${basicColor};
    color:white;
  }
`;

const MyLink = styled(NavLink)`
  box-sizing: border-box;
  transition: 300ms;
  width: 100%;
  height:3.5rem;
  display: flex;
  align-items: center;
  font-family: inherit;
  flex-wrap: nowrap;
  white-space: nowrap;
  justify-content: center;
  color: ${(props) => (props.theme as any).color};
`;
