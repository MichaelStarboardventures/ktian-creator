import {
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
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
    actions: { delete: deleteNode, add, selectNode },
    query: { node, parseFreshNode },
  } = useEditor();

  const {
    data: { displayName, type, parent, props },
  } = node(id).get();

  return selected || hovered ? (
    <ToolButtonsStyled gutter={[10, 0]} align={'middle'}>
      <Col>
        <ArrowUpOutlined
          onClick={() => {
            selectNode(parent);
          }}
        />
      </Col>
      {displayName !== 'Container' && (
        <>
          <Col>
            <CopyOutlined
              onClick={() => {
                const newNode = parseFreshNode({
                  data: { displayName, type, props, parent },
                }).toNode();

                add(newNode, parent);
                selectNode(newNode.id);
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
        </>
      )}
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
