import { CSSProperties, useState } from 'react';
import React = require('react');

export interface TextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant: 'title' | 'subtitle' | 'body' | 'custom';
  styleHover?: React.CSSProperties;
}

export function Text(props: TextProps) {
  const [isHovering, setHovering] = useState<boolean>(false);

  let style: CSSProperties = {
    fontSize: '18px',
    lineHeight: '18px',
    fontWeight: '800',
    color: '#DBDFEA',
  };

  if (isHovering && props.styleHover) {
    style = {
      ...style,
      ...props.styleHover,
    };
  } else {
    style = {
      ...style,
      ...props.style,
    };
  }

  if (props.variant === 'title') {
    return (
      <h1
        {...props}
        style={{
          ...style,
          fontSize: '18px',
          lineHeight: '18px',
          fontWeight: '800',
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {props.children}
      </h1>
    );
  }

  if (props.variant === 'subtitle') {
    return (
      <h1
        {...props}
        style={{
          ...style,
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '16px',
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {props.children}
      </h1>
    );
  }

  if (props.variant === 'body') {
    return (
      <h1
        {...props}
        style={{
          ...style,
          fontSize: '15px',
          lineHeight: '15px',
          fontWeight: '400',
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {props.children}
      </h1>
    );
  }

  return (
    <h1
      {...props}
      style={{
        fontSize: '15px',
        lineHeight: '15px',
        fontWeight: '400',
        ...style,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {props.children}
    </h1>
  );
}
