import React, { ComponentType } from "react";
import { Box } from "@mui/material";

interface HocProps {
  // Contains the prop my HOC needs
  thingy: number;
}

const hoc = function <T extends HocProps>(OriginComponent: ComponentType<T>) {
  return function WrapperComponent(props: T) {
    return (
      <Box>
        Start hoc demo
        <OriginComponent {...props} />
        End hoc demo
      </Box>
    );
  };
};

interface ChildClassProps {
  thingy: number;
}

function ChildClass(props: ChildClassProps) {
  return <h1>{props.thingy}</h1>;
}

export const Child = hoc(ChildClass);
