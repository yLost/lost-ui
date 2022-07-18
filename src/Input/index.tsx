import React = require('react');
import { ResizableProps, useResizable } from '../Resizable';

export interface InputProps extends ResizableProps {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string | number;
  onText: (value: string | number) => void;
}

export function Input(props: InputProps) {
  const [isHovering, setHovering] = React.useState<boolean>(false);
  const { styled, styledHover, ...rest } = props;

  const style: any = useResizable({
    styled,
    styledHover,
    isHovering,
  });

  return (
    <input
      {...rest}
      style={{
        padding: '5px 10px',
        color: '#FFF',
        borderRadius: '2px',
        backgroundColor: 'transparent',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        border: "none",
        outline: 'none',
        ...style,
      }}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onText(e.target.value)}
      onMouseEnter={(event) => {
        setHovering(true);
        props.onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovering(false);
        props.onMouseLeave?.(event);
      }}
    ></input>
  );
}
