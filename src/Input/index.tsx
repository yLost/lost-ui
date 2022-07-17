import React = require('react');

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string | number;
  onText: (value: string | number) => void;
}

export function Input(props: InputProps) {
  return (
    <input
      style={{
        padding: '10px 14px',
        color: '#FFF',
        borderRadius: '8px',
        backgroundColor: '#1D1E2C',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        ...props.style,
      }}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onText(e.target.value)}
    ></input>
  );
}
