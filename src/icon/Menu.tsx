import AniContainer from "style/AniContainer";
import styled from "@emotion/styled";
import { useRef } from "react";
import getCss from "utils/getCss";
import { iconProps } from "types/icon";

export default function Menu(props: iconProps<HTMLDivElement>) {
  const { cssStyle, isActive, ...otherProps } = props;

  /* 
    动画
  */
  // 顶部线条动画
  const topAnim = useRef({
    transform: "rotate(45deg)",
    width: "120%",
  }).current;
  // 底部线条动画
  const bottomAnim = useRef({
    transform: "rotate(-45deg)",
    width: "120%",
  }).current;
  //中间线条动画
  const midAnim = useRef({
    width: "0px",
    height: "20%",
  }).current;

  return (
    <Container theme={cssStyle} {...(otherProps as any)}>
      <Baseline
        theme={{
          transformOrigin: "center left",
          background: cssStyle?.color,
          ...(isActive ? topAnim : {}),
        }}
      />
      <Baseline
        theme={{ background: cssStyle?.color, ...(isActive ? midAnim : {}) }}
      />
      <Baseline
        theme={{
          transformOrigin: "center left",
          background: cssStyle?.color,
          ...(isActive ? bottomAnim : {}),
        }}
      />
    </Container>
  );
}
/* 
  样式
*/

// 外部容器
const Container = styled.div`
  padding: 2px;
  width: ${(props) => (props as any).size * 30}px;
  height: ${(props) => (props as any).size * 30}px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  ${(props) => getCss(props.theme)}
`;

// 线条基本样式
const Baseline = styled(AniContainer)`
  height: 20%;
  width: 100%;
  background-color: black;
  ${(props) => getCss(props.theme)}
`;
