import Routes from "router";
import TopBar from "components/TopBar";
import styled from "@emotion/styled";
import getCss from "utils/getCss";
import { useAppSelector } from "store/hooks";
import AniContainer from "style/AniContainer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "router";
import { getRoute } from "utils/mapRoutes";
import Drawer from "components/Drawer/DrawerRoot";

export default function App() {
  const theme = useAppSelector((s) => s.style.style);
  /* 
    路由
  */
  const location = useLocation();
  // title切换
  useEffect(() => {
    const [_, ...strArr] = location.pathname.split("/");
    const nowRoute = getRoute(strArr, routes);
    if (strArr.length === 1 && strArr[0] === "")
      document.title = "生涯规划";
    else if (nowRoute) document.title = nowRoute.name || "";
  }, [location]);

  return (
    <Container theme={{ background: theme.basic, color: theme.text }}>
      <TopBar />
      <Info>
        <Drawer />
        <Routes />
      </Info>
    </Container>
  );
}

const Container = styled(AniContainer)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  ${(props) => getCss(props.theme)}
`;

const Info = styled.div`
  position: relative;
  flex: 1;
`;
