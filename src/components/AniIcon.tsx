import styled from "@emotion/styled";
import { HTMLProps, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

interface propsType extends HTMLProps<HTMLOrSVGElement> {
  // 是否需要动画
  needAnimation?: boolean;
  // g元素下的元素名称
  typename: string;
  // 动画持续时间
  duration?: number;
  // 是否需要填充
  needFill?: boolean;
  // 填充颜色
  fillColor?: string;
}

export default function AniIcon(props: propsType) {
  const { needAnimation, needFill, fillColor, typename, duration, ...other } =
    props;
  const thisId = useRef(v4());
  const [aniLens, setAniLens] = useState<(number | null)[]>([]);
  useEffect(() => {
    const element = document.getElementById(thisId.current);
    const nowLens: (number | null)[] = [];
    element?.childNodes.forEach((e, idx) => {
      let thisLen = 0;
      thisLen = (e as any).getTotalLength();
      while (nowLens.length <= idx) {
        nowLens.push(null);
      }
      nowLens[idx] = thisLen;
    });
    setAniLens(nowLens);
  }, []);

  return (
    <Container
      id={thisId.current}
      typename={typename}
      needAnimation={needAnimation}
      childrenStyle={aniLens}
      duration={duration}
      needFill={needFill}
      fillColor={fillColor}
      {...(other as any)}
    ></Container>
  );
}

const Container = styled.g`
  /* 
  动画关键帧
  */
  @keyframes lineAni${(props) => props.id} {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes fillAni${(props) => props.id} {
    from {
      fill: transparent;
    }
    to {
      fill: ${(props) => (props as any).fillColor};
    }
  }

  ${(props) =>
    (props as any).needAnimation
      ? `animation: fillAni${props.id} ${(props as any).duration || 1}s ${
          (props as any).duration || 1
        }s forwards;`
      : ""}

  ${(props: any) =>
    /* 是否需要动画 */
    `
      /* 
        对动画的所有子元素进行赋值
      */
      ${props.childrenStyle.map((child: any, idx: number) => {
        /* 
          child判断是否有效
        */
        if (child)
          return `
            ${props.typename}:nth-of-type(${idx + 1}){
              stroke-dasharray:${child}px;
              stroke-dashoffset:${child}px ;
              ${
                props.needAnimation
                  ? `animation:${props.duration || 1}s lineAni${
                      props.id
                    } forwards;`
                  : ""
              }
            }`;
      })}`}
`;
