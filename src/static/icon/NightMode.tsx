import styled from "@emotion/styled";
import AniContainer from "style/AniContainer";
import { iconProps } from "static/types/icon";
import getCss from "utils/getCss";
import useMap from "utils/hooks/useMap";

// 太阳光属性
const sunlight = [
  { x: "293" },
  {
    x: "530.945",
    y: "73",
    transform: "rotate(45 530.945 73)",
  },
  {
    x: "648",
    y: "293",
    transform: "rotate(90 648 293)",
  },
  {
    transform: "matrix(-0.707107 0.707107 0.707107 0.707107 117.055 73)",
  },
  {
    transform: "matrix(4.37114e-08 1 1 -4.37114e-08 0 293)",
  },
  {
    transform: "matrix(1 0 0 -1 293 648)",
  },
  {
    x: "117.055",
    y: "575",
    transform: "rotate(-135 117.055 575)",
  },
  {
    transform: "matrix(0.707107 -0.707107 -0.707107 -0.707107 530.945 575)",
  },
];

export default function NightMode(props: iconProps<HTMLOrSVGElement>) {
  const { isActive, cssStyle, activeStyle, size, ...otherProps } = props;
  const[_,mapNodes]=useMap()
  return (
    <Container
      width={20 * (size || 1) + ""}
      height={20 * (size || 1) + ""}
      viewBox="0 0 648 648"
      theme={cssStyle}
      {...(otherProps as any)}
    >
      {mapNodes(sunlight,'sunlight',(e,key) => {
        return (
          <Rect
            key={key}
            className={isActive ? "" : "active"}
            x={e.x}
            y={e.y}
            transform={e.transform}
            width="62"
            height="147"
            fill={activeStyle?.color || cssStyle?.color || "black"}
          />
        );
      })}
      <Moon
        theme={
          isActive ? { opacity: 0 } : { opacity: 1, fill: cssStyle?.color }
        }
        as="path"
      />
      <Sun
        theme={
          isActive
            ? { opacity: 1, fill: activeStyle?.color || cssStyle?.color }
            : { opacity: 0 }
        }
        as="path"
      />
    </Container>
  );
}

const Container = styled.svg`
  .active {
    height: 0;
  }
  ${(props) => getCss(props.theme)}
`;

const Moon = styled(AniContainer)`
  fill-rule: evenodd;
  clip-rule: evenodd;
  d: path(
    "M466.329 55.567C460.501 55.1909 454.623 55 448.7 55C299.749 55 179 175.749 179 324.7C179 473.651 299.749 594.4 448.7 594.4C455.528 594.4 462.296 594.146 468.997 593.648C417.861 518.001 387.594 424.202 387.594 322.612C387.594 222.8 416.81 130.511 466.329 55.567Z"
  );
  fill: black;
  ${(props) => getCss(props.theme)}
`;

const Sun = styled(AniContainer)`
  d: path(
    "M449.5 318C449.5 388.692 397.692 446 327 446C256.308 446 199 388.692 199 318C199 247.308 256.308 190 327 190C397.692 190 449.5 247.308 449.5 318Z"
  );
  ${(props) => getCss(props.theme)}
`;

const Rect = styled.rect`
  transition: 0.3s;
  ${(props) => getCss(props.theme)}
`;
