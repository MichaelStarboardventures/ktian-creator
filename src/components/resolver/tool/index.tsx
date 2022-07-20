import { DeleteOutlined } from '@ant-design/icons';
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
  right: 1px;
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
    actions: { delete: deleteNode },
    query: { node },
  } = useEditor();

  const {
    data: { displayName },
  } = node(id).get();

  return (selected || hovered) && displayName !== 'Container' ? (
    <ToolButtonsStyled gutter={[5, 0]} align={'middle'}>
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
      {/*<Dropdown overlay={<ContextMenu />} trigger={['contextMenu']}>*/}
      {/*  {children}*/}
      {/*</Dropdown>*/}
      {children}
      <ToolButtons hovered={hovered} selected={selected} id={id} />
    </ToolStyled>
  ) : (
    <>{children}</>
  );
};
