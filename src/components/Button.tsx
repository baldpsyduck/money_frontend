import { HTMLProps } from "react";
import styled from "@emotion/styled";
import getCss from "utils/getCss";

export default function Button(props: HTMLProps<HTMLDivElement>) {
  const { style, ...otherprops } = props;
  return <Container {...(otherprops as any)} theme={style}></Container>;
}

const Container = styled.div`
  cursor: pointer;
  ${(props) => {
    return getCss(props.theme);
  }}
`;
