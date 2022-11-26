import AniIcon from "components/AniIcon";
import basicColor from "static/color/staticColors";
import { iconProps } from "static/types/icon";
import useMap from "utils/hooks/useMap";
import { data1, data2 } from "./data";

export function Motto1(props: iconProps<HTMLOrSVGElement>) {
  const { size, isActive } = props;
  const [_, mapNodes] = useMap();
  return (
    <svg
      width={2084 * (size || 1) + ""}
      height={624 * (size || 1) + ""}
      viewBox="0 0 209 63"
      fill="none"
      id="svg"
    >
      <AniIcon
        needAnimation={isActive}
        fillColor={basicColor}
        typename="path"
      >
        {mapNodes(data1, "path", (d, key) => {
          return (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              key={key}
              stroke={basicColor}
              strokeWidth={1}
              d={d}
            />
          );
        })}
      </AniIcon>
    </svg>
  );
}
export function Motto2(props: iconProps<HTMLOrSVGElement>) {
  const { size, isActive } = props;
  const [_, mapNodes] = useMap();
  return (
    <svg
      width={2084 * (size || 1) + ""}
      height={624 * (size || 1) + ""}
      viewBox="0 0 209 63"
      fill="none"
      id="svg"
    >
      <AniIcon
        needAnimation={isActive}
        fillColor={basicColor}
        typename="path"
      >
        {mapNodes(data2, "path", (d, key) => {
          return (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              key={key}
              stroke={basicColor}
              strokeWidth={1}
              d={d}
            />
          );
        })}
      </AniIcon>
    </svg>
  );
}
