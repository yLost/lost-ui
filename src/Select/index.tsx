import { useEffect, useRef, useState } from 'react';
import { Box } from '../Box';
import { Input } from '../Input';
import { Text } from '../Text';
import React = require('react');

export type Item = {
  name: string;
  id: string | number;
};

export interface SelectProps {
  width: number;
  title: string;
  items: Item[];
  selected: Item | null;
  style?: React.CSSProperties;
  styleList?: React.CSSProperties;
  styleItem?: React.CSSProperties;
  onSelect: (item: Item) => void;
}

export function Select(props: SelectProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<string | number>('');

  useEffect(() => {
    function handleClick(event: any) {
      if (ref.current && !ref.current.contains(event.target) && isOpen) {
        setOpen(false);
      }
    }

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [ref, isOpen]);

  const customStyle = props.style || {};
  const customStyleList = props.styleList || {};
  const customStyleItem = props.styleItem || {};

  return (
    <div
      ref={ref}
      style={{
        padding: '10px 14px',
        color: '#FFF',
        borderRadius: isOpen ? '0 0 8px 8px' : '8px',
        backgroundColor: '#24263A',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer',
        position: 'relative',
        width: props.width + 'px',
        height: '35px',
        ...customStyle,
      }}
      onClick={() => {
        if (isOpen === false) {
          setOpen(true);
        }
      }}
    >
      {/* Filter */}
      {isOpen && (
        <Input
          type="text"
          placeholder="Type a filter"
          value={search}
          onText={(text) => setSearch(text)}
          styled={{
            0: {
              borderRadius: '8px 8px 0 0',
              position: 'absolute',
              bottom: '30px',
              left: 0,
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 14px',
              gap: '4px',
              backgroundColor: '#24263A',
              width: props.width + 'px',
              height: '30px',
              zIndex: 1000,
              ...customStyle,
            },
          }}
        ></Input>
      )}

      {/* Default value */}
      <Text variant="subtitle">{props.selected ? props.selected.name : props.title}</Text>

      {/* Selector */}
      {isOpen && (
        <Box
          styled={{
            0: {
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 14px',
              gap: '4px',
              width: props.width + 'px',
              maxHeight: '200px',
              overflowY: 'auto',
              boxShadow: isOpen ? '0px 2px 4px rgba(0, 0, 0, 0.25)' : '0px 0px 4px rgba(0, 0, 0, 0.25)',
              zIndex: 1000,
              ...customStyleList,
            },
          }}
        >
          <Text
            key={-1}
            variant="subtitle"
            onClick={() => {
              props.onSelect({ name: props.title, id: -1 });
              setOpen(false);
            }}
            style={{
              cursor: 'pointer',
              color: null === props.selected?.id || -1 === props.selected?.id ? '#6125AC' : '#FFF',
            }}
            styleHover={{
              color: '#6125A9',
            }}
          >
            {props.title}
          </Text>

          {props.items.filter(
            (item) => item.name?.toLowerCase().includes(search.toString().toLowerCase()) || item.id === search,
          ).length === 0 && (
            <Text variant="subtitle" style={customStyleItem}>
              No results
            </Text>
          )}
          {props.items
            .filter((item) => item.name?.toLowerCase().includes(search.toString().toLowerCase()) || item.id === search)
            .map((item) => (
              <Text
                key={item.id}
                variant="subtitle"
                onClick={() => {
                  props.onSelect(item);
                  setOpen(false);
                }}
                style={{
                  ...customStyleItem,
                  cursor: 'pointer',
                  color: item.id === props.selected?.id ? '#6125AC' : '#FFF',
                }}
                styleHover={{
                  color: '#6125A9',
                }}
              >
                {item.name}
              </Text>
            ))}
        </Box>
      )}
    </div>
  );
}
