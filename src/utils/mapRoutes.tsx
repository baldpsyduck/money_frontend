import { MyRouteObject, routes } from "router";

// 获取对应路由信息
export function getRoute(
  addr: string[],
  children: MyRouteObject[]
): MyRouteObject | undefined {
  const [info, ...otheraddr] = addr;
  for (let i = 0; i < children.length; i++) {
    if (
      children[i].children &&
      otheraddr.length > 0 &&
      children[i].path === info
    ) {
      return getRoute(otheraddr, children[i].children!);
    }
    if (children[i].path === info) return children[i];
  }
  return undefined;
}

export default (
  addr: string[],
  fn: (r: MyRouteObject, idx: number) => MyRouteObject | undefined
): Array<MyRouteObject | undefined> | undefined => {
  const rs = getRoute(addr, routes);
  if (rs && rs.children)
    return rs.children.map((r, idx) => {
      const res = fn(r, idx);
      if (res) return res;
    });
};
