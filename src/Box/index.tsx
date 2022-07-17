import { useState } from 'react';
import { ResizableProps, useResizable } from '../Resizable';
import React = require('react');

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, ResizableProps {
  styleHover?: React.CSSProperties;
}

export function Box(props: BoxProps) {
  const [isHovering, setHovering] = useState<boolean>(false);
  const { styled, styledHover, ...rest } = props;

  const style: any = useResizable({
    styled,
    styledHover,
    isHovering,
  });

  return (
    <div
      {...rest}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        padding: '10px',
        ...style,
      }}
      onMouseEnter={(event) => {
        setHovering(true);
        props.onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovering(false);
        props.onMouseLeave?.(event);
      }}
    >
      {props.children}
    </div>
  );
}
