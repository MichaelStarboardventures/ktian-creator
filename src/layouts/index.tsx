import { Charts } from '@/components/charts';
import { Provider } from '@/components/provider';
import * as resolvers from '@/components/resolver';
import { Container as LayoutContainer } from '@/layouts/components/container';
import { LeftPanel } from '@/layouts/components/left-panel';
import { PropertiesPanel } from '@/layouts/components/properties-panel';
import { Tabs } from '@/layouts/components/tabs';
import { Toolbar } from '@/layouts/components/toolbar';
import { Wrapper } from '@/layouts/components/wrapper';
import { Editor } from '@craftjs/core';
import { Col } from 'antd';
import React from 'react';
import { Outlet, useModel } from 'umi';
import './index.less';

const Layouts: React.FC = () => {
  const { setPages, currentPage } = useModel('pages');

  return (
    <Editor
      resolver={{ ...resolvers }}
      onNodesChange={(query) => {
        setPages((pages) => {
          return pages?.map((page) => {
            if (currentPage?.path === page?.path) {
              page.content = query.serialize();
            }

            return page;
          });
        });
      }}
    >
      <Provider>
        <Wrapper>
          <Tabs />
          <Toolbar />
          <LayoutContainer>
            <Col flex={'240px'}>
              <LeftPanel />
            </Col>
            <Col flex={'auto'} className={'layouts-content'}>
              <Outlet />
            </Col>
            <Col flex={'240px'}>
              <PropertiesPanel />
            </Col>
          </LayoutContainer>
        </Wrapper>
        <Charts />
      </Provider>
    </Editor>
  );
};

export default Layouts;
