export interface iconProps<T> extends React.HTMLProps<T> {
  isActive?: boolean;
  cssStyle?: React.CSSProperties;
  activeStyle?: React.CSSProperties;
  size?:number;
}