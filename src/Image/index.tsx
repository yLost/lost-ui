import { useEffect, useState } from 'react';
import React = require('react');
import { Text } from '../Text';

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  source: string;
  alt: string;
  size?: string;
}

export function Image(props: ImageProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await fetch(props.source, {
          method: 'GET',
        });

        const response = await responseData.blob();

        if (response.size <= 1028) {
          return setLoading(false);
        }

        const url = URL.createObjectURL(response);

        setImage(url);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div
        {...props}
        style={{
          width: props.size || '20px',
          height: props.size || '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          ...props.style,
        }}
      >
        <Text variant="title">...</Text>
      </div>
    );
  }

  if (!image) {
    return (
      <div
        {...props}
        style={{
          width: props.size || '20px',
          height: props.size || '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          ...props.style,
        }}
      >
        <Text variant="title">{props.alt.substring(0, 1)}</Text>
      </div>
    );
  }

  return (
    <img
      {...props}
      src={image}
      style={{
        width: props.size || '20px',
        height: props.size || '20px',
        ...props.style,
      }}
    ></img>
  );
}
