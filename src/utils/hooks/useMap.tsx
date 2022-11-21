import { useRef } from "react";
import { v4 } from "uuid";

/* 
  操作函数（map里的函数）的类型，参数为（得到的值，得到的key值，当前索引）
*/
type opFun = (val: any, key: string,idx:number) => any;

/* 
  主函数，返回值为当前组件生成的key与代替arr.map的一个函数
  返回的函数需传入三个参数（数组，该次遍历的名称，操作函数）
*/
export default function useKeys(): [
  string,
  (arr: any[], name: string, fn: opFun) => any
] {
  const mainKey = useRef(v4()).current;
  return [
    mainKey,
    (arr: any[], name: string, fn: opFun) => {
      return arr.map((a, idx) => {
        return fn(a, mainKey + name + idx,idx);
      });
    },
  ];
}
