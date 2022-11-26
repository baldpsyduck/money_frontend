import styled from "@emotion/styled";
import { basicColor } from "static/color/staticColors";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "router";
import AniContainer from "style/AniContainer";
import getCss from "utils/getCss";
import NavLink from "components/NavLink";
import { useAppSelector } from "store/hooks";
import useMap from "utils/hooks/useMap";

/* 
  Links
*/
interface propsType {
  isPhone: boolean;
  titleClicked?: boolean;
}

export default function Links(props: propsType) {
  const themeColor = useAppSelector((s) => s.style.style);
  const { isPhone, titleClicked } = props;
  // 获取Link宽度
  const widths = useRef<Array<HTMLAnchorElement | null>>([]);
  // 当前y移动到Link索引
  const [linkIdx, setLinkIdx] = useState(0);
  // bottomBar的位置
  const [nowBottom, setNowBottom] = useState<Array<number>>([]);
  // 当前鼠标指针位于Link上
  const [isOnLink, setIsOnLink] = useState(false);
  // 当前active的Link
  const activeLink = useRef(0);
  // 当前总宽度
  const totalWidth = useRef(0);
  // 当前页面位置
  useEffect(() => {
    routes.map((r, idx) => {
      if ("/" + r.path === location.pathname) {
        activeLink.current = idx;
        setLinkIdx(idx);
      }
    });
  }, [titleClicked]);
  // 位置改变
  useEffect(() => {
    let res = 0;
    for (let i = 0; i < (isOnLink ? linkIdx : activeLink.current); i++)
      res += widths.current[i]?.clientWidth || 0;
    setNowBottom([
      res,
      widths.current[isOnLink ? linkIdx : activeLink.current]?.clientWidth || 0,
    ]);
    if (totalWidth.current === 0) {
      for (let i = 0; i < widths.current.length; i++)
        totalWidth.current += widths.current[i]?.clientWidth || 0;
    }
  }, [linkIdx, isOnLink, titleClicked]);
  let location = useLocation();
  // map
  const [_, mapNodes] = useMap();

  return (
    <Routes
      theme={{
        width: isPhone ? 0 : totalWidth.current || undefined,
        totalWidth: totalWidth.current || undefined,
        display: isPhone ? "none" : "flex",
      }}
    >
      {mapNodes(routes, "Links", (r, key, idx) => {
        if (r.name)
          return (
            <MyLink
              key={key}
              ref={(e: any) => {
                if (widths.current.length < idx + 1) widths.current.push(e);
                else {
                  widths.current[idx] = e;
                }
              }}
              onClick={() => {
                activeLink.current = idx;
              }}
              onMouseEnter={() => {
                setLinkIdx(idx);
                setIsOnLink(true);
              }}
              onMouseLeave={() => {
                setIsOnLink(false);
              }}
              to={r.path || ""}
              theme={{ color: themeColor.text }}
            >
              {r.name}
            </MyLink>
          );
      })}
      <ActiveBar
        theme={{ left: nowBottom[0] + "px", width: nowBottom[1] + "px" }}
      />
    </Routes>
  );
}

// 路由外壳
const Routes = styled(AniContainer)`
  .active {
    background-color: ${basicColor};
    color: white;
  }
  display: ${(props) => (props.theme as any).display};
  overflow: hidden;
  position: relative;
  width: ${(props) => (props.theme as any).width}px;
  left:${-186+52}px;
`;

// NavLink 样式
const MyLink = styled(NavLink)`
  transition: 300ms;
  padding: 1rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  font-family: inherit;
  flex-wrap: nowrap;
  white-space: nowrap;
  color: ${(props) => (props.theme as any).color};
`;

const ActiveBar = styled(AniContainer)`
  height: 2px;
  width: 20px;
  position: absolute;
  background: ${basicColor};
  bottom: 0;
  ${(props) => getCss(props.theme)};
`;
