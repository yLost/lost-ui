import { useState, useEffect } from 'react';

export type ResizableStyleProps = {
  [key: string]: React.CSSProperties;
  [value: symbol]: React.CSSProperties;
};

export interface ResizableProps extends React.HTMLAttributes<HTMLDivElement> {
  styled: ResizableStyleProps;
  styledHover?: React.CSSProperties;
  isHovering?: boolean;
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
  const { styled, styledHover, isHovering } = props;

  let styleOnHover = {};

  if (styledHover && isHovering) {
    styleOnHover = styledHover;
  }

  if (styled) {
    const keys = Object.keys(styled);

    for (const key of keys) {
      const maxWidth = Number.parseInt(key);
      const style = styled[maxWidth];

      if (width <= maxWidth) {
        return {
          ...styled['0'],
          ...style,
          ...styleOnHover,
        };
      }
    }

    return { ...styled['0'], ...styleOnHover };
  }

  return styleOnHover;
}
