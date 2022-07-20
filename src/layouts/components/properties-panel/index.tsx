import { useEditor } from '@craftjs/core';
import { Divider, Paper } from '@mui/material';
import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

const PropertiesPanelStyled = styled(Paper)`
  height: 100%;

  & h4,
  h6 {
    margin: 0;
    padding: 0 10px;
    line-height: 40px;
    font-weight: bold;
  }
`;

const Properties = () => {
  const { selected, nodes } = useEditor((state) => ({
    nodes: state.nodes,
    selected: state.events.selected,
  }));

  const selecteds = Array.from(selected);

  if (!selecteds?.length) return null;

  const Settings = nodes[selecteds[0]]?.related?.settings as React.FC;

  return Settings ? <Settings /> : null;
};

export const PropertiesPanel = () => {
  const { selected, nodes } = useEditor((state) => ({
    nodes: state.nodes,
    selected: state.events.selected,
  }));

  const selecteds = Array.from(selected);
  const displayName = nodes[selecteds[0]]?.data?.displayName;

  return (
    <PropertiesPanelStyled>
      <Row align={'middle'}>
        <Col span={24}>
          <h4>Inspect</h4>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
        {displayName && (
          <>
            <Col span={24}>
              <h6>{displayName}</h6>
            </Col>
            <Col span={24}>
              <Divider />
            </Col>
          </>
        )}
      </Row>
      <Properties />
    </PropertiesPanelStyled>
  );
};
