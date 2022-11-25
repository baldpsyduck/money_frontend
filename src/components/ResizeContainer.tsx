import { useEffect, useState } from "react";

interface propsType {
  children: JSX.Element[] | JSX.Element;
  zoom: number;
}

/* 
    three的自适应组件
*/
export default function ResizeContainer(props: propsType) {
  const { children, zoom } = props;
  // 需要渲染的children
  const [myChildren, setMyChildren] = useState<JSX.Element[] | JSX.Element>();

  useEffect(() => {
    if (children instanceof Array) {
      setMyChildren(
        children.map((c) => {
          const { props, ...other } = c;
          const { scale, position, ...otherProps } = props;
          const newPosition = position
            ? position.map((p: any) => p * zoom)
            : [0, 0, 0];
          const newScale = scale
            ? scale.map((s: any) => s * zoom)
            : [zoom, zoom, zoom];

          // 新props
          const newCProps = {
            position: newPosition,
            scale: newScale,
            ...otherProps,
          };

          // 新元素
          const newC = { ...other, props: newCProps };
          return newC;
        })
      );
    } else {
      console.log(children);
      
      const { props, ...other } = children;
      const { scale, position, ...otherProps } = props;
      const newPosition = position
        ? position.map((p: any) => p * zoom)
        : [0, 0, 0];
      const newScale = scale
        ? scale.map((s: any) => s * zoom)
        : [zoom, zoom, zoom];

      // 新props
      const newCProps = {
        position: newPosition,
        scale: newScale,
        ...otherProps,
      };

      // 新元素
      const newChildren = { ...other, props: newCProps };
      setMyChildren(newChildren);
    }
  }, []);
  return <>{myChildren && myChildren}</>;
}
