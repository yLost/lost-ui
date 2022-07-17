import React = require('react');

export interface SpacingProps {
  height: number;
}

export function Spacing(props: SpacingProps) {
  return (
    <div
      style={{
        height: `${props.height}px`,
      }}
    ></div>
  );
}
