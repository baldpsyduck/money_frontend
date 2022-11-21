import { HTMLProps } from "react";
import ReactDOM from "react-dom";

export default function Drawer(props: HTMLProps<HTMLDivElement>) {
  const root: HTMLElement = document.getElementById(
    "my-drawer-root"
  ) as HTMLElement;
  return <>{root&&ReactDOM.createPortal(<>{props.children}</>, root)}</>;
}
