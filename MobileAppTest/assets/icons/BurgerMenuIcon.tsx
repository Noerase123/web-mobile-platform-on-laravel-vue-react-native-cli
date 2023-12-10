import * as React from "react";
import Svg, { Defs, G, Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title, sodipodi:namedview, metadata */
export const BurgerMenuIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 448 448"
    {...props}
  >
    <Defs />
    <G
      id="layer1"
      transform="translate(0,-604.36224)"
    >
      <Path
        id="rect4138"
        d="m 0,636.36224 448,0 0,64 -448,0 z m 0,160.00002 448,0 0,64 -448,0 z m 0,160.00004 448,0 0,64 -448,0 z"
      />
    </G>
  </Svg>
);