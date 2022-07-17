import { useState } from 'react';
import { ResizableStyleProps, useResizable } from '../Resizable';
import React = require('react');
import { Link, LinkProps } from 'react-router-dom';

export function LinkTo({
  styled,
  styledHover,
  ...props
}: LinkProps & { styled: ResizableStyleProps; styledHover: React.CSSProperties }) {
  const [isHovering, setHovering] = useState<boolean>(false);

  const styleResizabled = useResizable({
    styled,
    styledHover,
    isHovering,
  });

  return (
    <Link
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        padding: '10px',
        ...styleResizabled,
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
    </Link>
  );
}
