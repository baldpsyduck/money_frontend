import { useRef } from "react";
import isEqual from "utils/isEqual";

export default function () {
  const lastScroll = useRef(-1);
  return (offset: number) => {
    if (!isEqual(lastScroll.current, offset)) {
      lastScroll.current = offset;
      return false;
    }
    return true;
  };
}
