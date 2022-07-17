import { useState } from 'react';
import React = require('react');
import { ResizableProps, useResizable } from '../Resizable';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, ResizableProps {
  styleHover?: React.CSSProperties;
}

export function Box(props: BoxProps) {
  const [isHovering, setHovering] = useState<boolean>(false);

  let extraStyle: React.CSSProperties | undefined = props.style;

  const styleResizabled = useResizable({ styleResize: props.styleResize });
  if (styleResizabled) {
    extraStyle = { ...extraStyle, ...styleResizabled };
  }

  if (isHovering && props.styleHover) {
    extraStyle = { ...extraStyle, ...props.styleHover };
  }

  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        borderRadius: '4px',
        background: '#24263A',
        padding: '10px',
        ...extraStyle,
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
