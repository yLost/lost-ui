import React = require('react');

export interface SwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  onSwitch: (active: boolean) => void;
}

export function Switcher(props: SwitcherProps) {
  return (
    <div
      style={{
        width: '45px',
        height: '30px',
        backgroundColor: props.active ? '#6125AC' : '#2D3050',
        borderRadius: '20px',
        boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        padding: '0 4px',
        cursor: 'pointer',
        transition: 'all ease 500ms',
      }}
      onClick={() => {
        props.onSwitch(!props.active);
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#FFF',
          position: 'absolute',
          top: '5px',
          left: props.active ? '20px' : '5px',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          transition: 'all ease 500ms',
        }}
      ></div>
    </div>
  );
}
