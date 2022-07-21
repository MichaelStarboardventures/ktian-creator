import { Context } from '@/components/provider';
import * as resolvers from '@/components/resolver';
import { useEditor, UserComponent } from '@craftjs/core';
import {
  BusinessOutlined,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import { Button, Col, Row, Tabs } from 'antd';
import _ from 'lodash';
import React, { useContext } from 'react';
import styled from 'styled-components';

const TabsStyled = styled(Tabs)`
  margin-top: 15px;
`;

const Item = ({
  create,
  resolver,
}: {
  create: (dom: HTMLElement, userElement: React.ReactElement) => HTMLElement;
  resolver: UserComponent;
}) => {
  const Node = resolver as React.FC;

  return resolver?.craft?.displayName ? (
    <Col span={12} style={{ position: 'relative' }}>
      <Button block ref={(ref) => create(ref as HTMLDivElement, <Node />)}>
        {resolver?.craft?.displayName}
      </Button>
    </Col>
  ) : null;
};

export const Charts = () => {
  const { drawVisible, setDrawVisible } = useContext(Context);
  const {
    connectors: { create },
  } = useEditor();

  const materials = _.omit(resolvers, [
    'Container',
    'Frame',
    'Tool',
    'Button',
    'Text',
  ]);

  return (
    <Drawer
      open={drawVisible}
      variant={'persistent'}
      anchor={'left'}
      sx={{
        width: 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 300,
          boxSizing: 'border-box',
          overflow: 'hidden',
        },
      }}
    >
      <Row justify={'space-between'} align={'middle'}>
        <Col>
          <Typography variant={'h6'} pl={2}>
            Store
          </Typography>
        </Col>
        <Col>
          <IconButton onClick={() => setDrawVisible(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <TabsStyled type={'card'} size={'small'}>
        <TabsStyled.TabPane
          tab={
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <BusinessOutlined />
              <span>Business</span>
            </Stack>
          }
          key={'Business'}
        >
          <Row gutter={[15, 15]} style={{ padding: 15 }}>
            {Object.values(materials).map((resolver: UserComponent, index) => {
              return <Item key={index} create={create} resolver={resolver} />;
            })}
          </Row>
        </TabsStyled.TabPane>
      </TabsStyled>
    </Drawer>
  );
};
