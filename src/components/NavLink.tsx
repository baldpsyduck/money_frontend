import { forwardRef } from "react";
import { NavLink, NavLinkProps as BaseProps } from "react-router-dom";
import setClassName from "utils/setClassName";

interface NavLinkProps extends BaseProps {
  activeName?: string;
}

export default forwardRef((props: NavLinkProps, ref: any) => {
  return (
    <NavLink
      {...props}
      className={setClassName(
        props.activeName || "active",
        props.className as string
      )}
      ref={ref}
    />
  );
});
