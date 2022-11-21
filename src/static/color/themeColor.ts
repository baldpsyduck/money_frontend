import { theme } from "types/color";
export function getTheme (isNight: boolean = false) {
  const res: theme = {
    basic: isNight ? "black" : "white",
    text: isNight ? "white" : "black",
  };
  return res;
}
