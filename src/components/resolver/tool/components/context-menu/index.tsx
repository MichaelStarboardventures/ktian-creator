import { useEditor } from '@craftjs/core';
import { Menu } from 'antd';
import React from 'react';

export const ContextMenu = () => {
  const {
    actions: { delete: deleteNode, addNodeTree },
    selected,
    query: { node, parseReactElement },
  } = useEditor((state) => ({
    selected: state.events.selected || state.events.hovered,
  }));

  return (
    <Menu
      onClick={({ key }) => {
        if (key === 'copy') {
          const {
            data: { type, props, parent },
          } = node(Array.from(selected)[0]).get();
          const newNode = parseReactElement(
            React.createElement(type, { ...props }),
          ).toNodeTree();

          addNodeTree(newNode, parent);
        }

        if (key === 'remove') {
          const {
            data: { parent },
          } = node(Array.from(selected)[0]).get();

          const {
            data: { displayName },
          } = node(parent).get();

          if (displayName === 'Frame') return;

          deleteNode(Array.from(selected)[0]);
        }
      }}
      items={[
        {
          label: 'Copy',
          key: 'copy',
        },
        {
          label: 'Remove',
          key: 'remove',
        },
      ]}
    />
  );
};
