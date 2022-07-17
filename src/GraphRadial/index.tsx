import { useEffect, useState } from 'react';
import { Text } from '../Text';
import React = require('react');

export interface GraphRadialProps {
  percent?: number;
  size?: number;
  outColor: string;
  percentColor: string;
  color: string;
}

export function GraphRadial(props: GraphRadialProps) {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    if (props.percent) {
      setPercent(props.percent);
    }
  }, []);

  const size = props.size || 100;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
      }}
    >
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          position: 'absolute',
          backgroundColor: props.outColor,
        }}
      >
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            transform: `rotate(calc(${(percent / 100).toFixed(2)} * 360deg / 2))`,
            clip: `rect(0px, ${size}px, ${size}px, ${size / 2}px)`,
            transition: 'transform 1s',
            position: 'absolute',
            backgroundColor: props.outColor,
          }}
        >
          <div
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotate(calc(${(percent / 100).toFixed(2)} * 360deg / 2))`,
              clip: `rect(0px, ${size / 2}px, ${size}px, 0px)`,
              backgroundColor: props.percentColor,
              transition: 'transform 1s',
              borderRadius: '50%',
              position: 'absolute',
            }}
          ></div>
        </div>
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            clip: `rect(0px, ${size}px, ${size}px, ${size / 2}px)`,
            transition: 'transform 1s',
            borderRadius: '50%',
            position: 'absolute',
            backgroundColor: props.outColor,
          }}
        >
          <div
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotate(calc(${(percent / 100).toFixed(2)} * 360deg / 2))`,
              clip: `rect(0px, ${size / 2}px, ${size}px, 0px)`,
              backgroundColor: props.percentColor,
              transition: 'transform 1s',
              borderRadius: '50%',
              position: 'absolute',
            }}
          ></div>
          <div
            style={{
              width: `${size}px`,
              height: `${size}px`,
              clip: `rect(0px, ${size / 2}px, ${size}px, 0px)`,
              backgroundColor: props.percentColor,
              transform: `rotate(calc(${(percent / 100).toFixed(2)} * 360deg))`,
              transition: 'transform 1s',
              borderRadius: '50%',
              position: 'absolute',
            }}
          ></div>
        </div>
      </div>
      <div
        style={{
          marginLeft: '15px',
          marginTop: '15px',
          width: `${size - 30}px`,
          height: `${size - 30}px`,
          position: 'absolute',
          backgroundColor: props.color,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Text variant="title">{props.percent || 0}%</Text>
      </div>
    </div>
  );
}
