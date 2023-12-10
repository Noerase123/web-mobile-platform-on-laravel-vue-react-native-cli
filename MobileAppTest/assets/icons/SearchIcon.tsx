import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const SearchIcon = (props: SvgProps) => (
  <Svg
    fill="#dedede"
    width="20px"
    height="20px"
    viewBox="-2.5 -2.5 24 24"
    preserveAspectRatio="xMinYMin"
    {...props}
  >
    <Path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z" />
  </Svg>
);