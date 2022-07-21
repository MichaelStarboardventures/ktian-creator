import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEditor, useNode } from '@craftjs/core';
import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { getBorder } from './utils';

const ToolStyled = styled.div<{ hovered: boolean; selected: boolean }>`
  position: relative;
  border: ${({ hovered, selected }) => `
    ${getBorder(hovered, selected)}
  `};
`;

const ToolButtonsStyled = styled(Row)`
  position: absolute;
  right: 4px;
  top: -1px;
  padding: 5px;
  background-color: #5a5a5a;
  color: #fff;
  transform: translateY(-100%);
`;

const ToolButtons = ({
  selected,
  hovered,
  id,
}: {
  selected: boolean;
  id: string;
  hovered: boolean;
}) => {
  const {
    actions: { delete: deleteNode, addNodeTree, selectNode },
    query: { node, parseReactElement },
  } = useEditor();

  const {
    data: { displayName, props, type, parent },
  } = node(id).get();

  return (selected || hovered) && displayName !== 'Container' ? (
    <ToolButtonsStyled gutter={[10, 0]} align={'middle'}>
      <Col>
        <CopyOutlined
          onClick={() => {
            const CopyNode = React.createElement(type, {
              ...props,
            });

            const nodeTree = parseReactElement(CopyNode).toNodeTree();

            addNodeTree(nodeTree, parent);
            selectNode(nodeTree.rootNodeId);
          }}
        />
      </Col>
      <Col>
        <DeleteOutlined
          onClick={() => {
            deleteNode(id);
          }}
        />
      </Col>
    </ToolButtonsStyled>
  ) : null;
};

export const Tool: React.FC = ({ children }) => {
  const {
    id,
    connectors: { connect, drag },
    hovered,
    selected,
  } = useNode((node) => ({
    hovered: node.events.hovered,
    selected: node.events.selected,
  }));
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? (
    <ToolStyled
      hovered={hovered}
      selected={selected}
      ref={(ref) => connect(drag(ref as HTMLDivElement))}
    >
      {children}
      <ToolButtons hovered={hovered} selected={selected} id={id} />
    </ToolStyled>
  ) : (
    <>{children}</>
  );
};
