import { iconProps } from "static/types/icon";
import basicColor from "static/color/staticColors";
import AniIcon from "components/AniIcon";
import { useRef } from "react";
import useMap from "utils/hooks/useMap";
import data from './data';
import text from './text';

/* 
  单纯的icon
*/
export default function Title(props: iconProps<HTMLOrSVGElement>) {
  const { size,isActive } = props;
  // path数据
  const ds = useRef(data).current;
  const [_, mapNodes] = useMap();
  return (
    <svg
      width={948 * (size || 1) + ""}
      height={948 * (size || 1) + ""}
      viewBox="0 0 948 948"
      fill="none"
      id="svg"
    >
      <AniIcon needAnimation={isActive} needFill fillColor={basicColor} typename="path">
        {mapNodes(ds, "path", (d, key) => {
          return <path  fillRule="evenodd" clipRule="evenodd" key={key} stroke={basicColor} strokeWidth={3} d={d} />;
        })}
      </AniIcon>
      <AniIcon needAnimation={isActive} typename="rect">
        <rect
          x="12.5"
          y="12.5"
          width="923"
          height="923"
          rx="474"
          stroke={basicColor}
          strokeWidth="25"
        />
      </AniIcon>
    </svg>
  );
}

/* 
  带文字的Icon
*/
export function TitleWithText(props: iconProps<HTMLOrSVGElement>) {
  const { size,isActive,...other } = props;
  const [_, mapNodes] = useMap();
  // path数据
  const texts = useRef(text);
  return (
    <>
      <svg
        width={385 * (size || 1) + ""}
        height={109 * (size || 1) + ""}
        viewBox="0 0 3127 948"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Title isActive={isActive} {...other} />
        <AniIcon needAnimation={isActive} needFill fillColor={basicColor} typename="path">
          {mapNodes(texts.current, "titleText", (n, key) => {
            return <path d={n} key={key} stroke={basicColor} strokeWidth={15} />;
          })}
        </AniIcon>
      </svg>
    </>
  );
}
