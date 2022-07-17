import { useState } from 'react';
import { ResizableProps, useResizable } from '../Resizable';
import React = require('react');

export interface LinkProps extends React.HTMLAttributes<HTMLDivElement>, ResizableProps {
  styleHover?: React.CSSProperties;
}

export function Link(props: LinkProps) {
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
    >
      {props.children}
    </div>
  );
}
