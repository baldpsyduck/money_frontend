import styled from "@emotion/styled";
import basicColor from "static/color/staticColors";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { changeStyle } from "store/features/style";
import NightMode from "static/icon/NightMode";
import { useEffect, useState } from "react";
import Links from "./Links";
import { TitleWithText } from "static/icon/Title";
import { Link } from "react-router-dom";
import Menu from "static/icon/Menu";
import getCss from "utils/getCss";
import { changeShow } from "store/features/drawer";
import Drawer from "components/Drawer";
import DrawerInner from "./DrawerInner";
import { getTheme } from "static/color/themeColor";
import { changeSize } from "store/features/size";

export default function TopBar() {
  // 主题色
  const themeColor = useAppSelector((s) => s.style.style);
  // 夜间模式判断
  const [isNight, setIsNight] = useState(
    JSON.stringify(themeColor) === JSON.stringify(getTheme(true))
  );
  const dispatch = useAppDispatch();
  const [titleClicked, setTitleClicked] = useState(false);

  /* 
    title
  */
  // title移入判断
  const [titleActive, setTitleActive] = useState(true);
  // 移入设置
  useEffect(() => {
    setTimeout(() => {
      setTitleActive(true);
    }, 30);
  }, [titleActive]);

  /* 
    Menu
  */
  const { show } = useAppSelector((s) => s.drawer);

  /* 
    自适应布局
  */

  // 是否为手机
  const [isPhone, setIsPhone] = useState(false);

  // 监听窗口变化
  const onResize = (e: UIEvent) => {
    setIsPhone((e.currentTarget! as any).innerWidth <= 1000);
    dispatch(
      changeSize({ width: window.innerWidth, height: window.innerHeight })
    );
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    setIsPhone(window.innerWidth <= 1000);
    
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isPhone) dispatch(changeShow(false));
  }, [isPhone]);

  return (
    <Container>
      {/* 
        Menu栏
      */}
      <MenuContainer
        onClick={() => {
          dispatch(changeShow(!show));
          return false;
        }}
        theme={{
          display: isPhone ? "block" : "none",
        }}
      >
        <Menu
          isActive={show}
          cssStyle={{ color: themeColor.text }}
          size={0.5}
        />
      </MenuContainer>
      {isPhone && (
        <Drawer>
          <DrawerInner />
        </Drawer>
      )}
      {/* 
        title
      */}
      <TitleContainer
        onClick={() => {
          setTitleClicked(!titleClicked);
        }}
        onMouseEnter={() => {
          setTitleActive(false);
        }}
        to="/"
      >
        <TitleWithText isActive={titleActive} size={0.4} />
      </TitleContainer>

      {/* 
        路由
      */}
      <Links titleClicked={titleClicked} isPhone={isPhone} />

      {/* 
        夜间模式
      */}
      <NMContainer
        onClick={() => {
          dispatch(changeStyle(!isNight));
          setIsNight(!isNight);
        }}
      >
        <NightMode isActive={isNight} cssStyle={{ color: themeColor.text }} />
      </NMContainer>
    </Container>
  );
}

/* 
  样式
*/

// 外壳
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 3.5rem;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  z-index: 999;

  .routeIsphone {
    width: 0;
  }
`;

const TitleContainer = styled(Link)`
  padding: 0 1rem;
`;

const NMContainer = styled.div`
  padding: 0 1rem;
`;

const MenuContainer = styled.div`
  padding: 0 1rem;
  ${(props) => getCss(props.theme)}
`;
