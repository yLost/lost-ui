import { useEffect, useState } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import React = require('react');

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  persistentHover: boolean;
  percent: number;
  textHover: string;
}

export function Progress(props: ProgressProps) {
  const [isHovering, setIsHovering] = useState<boolean>(props.persistentHover);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    setPercent(props.percent);
  }, []);

  return (
    <Box
      styled={{
        0: {
          padding: 0,
          borderRadius: '20px',
          height: '25px',
          boxShadow: '0 5px 5px rgba(0,0,0,0.2)',
        },
      }}
      onMouseEnter={() => {
        if (!props.persistentHover) {
          setIsHovering(true);
        }
      }}
      onMouseLeave={() => {
        if (!props.persistentHover) {
          setIsHovering(false);
        }
      }}
    >
      <Box
        styled={{
          0: {
            position: 'relative',
            background: '#6125AC',
            borderRadius: '20px',
            width: (Number.isInteger(percent) ? percent : 0) + '%',
            height: '25px',
            transition: 'all ease 1500ms',
          },
        }}
      >
        {/* Percent */}
        {isHovering && (
          <Box
            styled={{
              0: {
                position: 'absolute',
                top: '-1px',
                right: '-30px',
                zIndex: 5,
                background: '#6125AC',
                padding: '5px 10px',
                borderRadius: '10px',
                boxShadow: '-5px 0px 5px rgba(0,0,0,0.1)',
                width: '100px',
                cursor: 'pointer',
              },
            }}
          >
            <Text
              variant="custom"
              style={{
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
              }}
            >
              {props.textHover}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
