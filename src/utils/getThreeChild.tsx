import { Scene } from "three";

export default function (scene: Scene, names: string[]) {
  let nowChildren = scene.children;
  for (let i = 0; i < names.length; i++) {
    let j = 0;
    let lastSize = nowChildren.length;
    for (; j < nowChildren.length; j++) {
      if (nowChildren[j].name === names[i]) {
        if (i === names.length - 1) {
          return {children:nowChildren,index:j};
        } else {
          nowChildren = nowChildren[j].children;
          break;
        }
      }
    }
    if (j === lastSize) return {};
  }
  return {}
}
