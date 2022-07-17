import { useState, useEffect } from 'react';

export interface ResizableStyleProps {
  width: number;
  style: React.CSSProperties;
}

export interface ResizableProps extends React.HTMLAttributes<HTMLDivElement> {
  styleResize?: ResizableStyleProps[];
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function useResizable(props: ResizableProps) {
  const { width } = useWindowDimensions();

  const { styleResize } = props;

  if (styleResize) {
    for (let resize of styleResize) {
      if (width <= resize.width) {
        return resize.style;
      }
    }
  }

  return null;
}
