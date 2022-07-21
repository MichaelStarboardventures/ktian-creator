import { Context } from '@/components/provider';
import { Frame, Text } from '@/components/resolver';
import { Display } from '@/layouts/components/display';
import { Todo } from '@/layouts/components/todo';
import {
  LinkOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useEditor } from '@craftjs/core';
import { Button as AntButton, Col, Row, Tooltip } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';

const ToolbarStyled = styled.div`
  height: 48px;
  background-color: #5a5a5a;

  & .toolbar-content {
    height: 100%;
    padding: 0 10px;
    color: #fff;
  }

  & .toolbar-device {
    color: #fff;
  }

  & .toolbar-icon {
    font-size: 25px;
    cursor: pointer;
  }
`;

export const Toolbar = () => {
  const {
    connectors: { create },
  } = useEditor();
  const { setDrawVisible } = useContext(Context);

  const FrameNode = Frame as unknown as React.FC;
  const TextNode = Text as unknown as React.FC;

  return (
    <ToolbarStyled>
      <Row
        className={'toolbar-content'}
        align={'middle'}
        justify={'space-between'}
      >
        <Col>
          <Row gutter={[10, 0]}>
            <Col>
              <AntButton
                ref={(ref) =>
                  create(ref as unknown as HTMLDivElement, <FrameNode />)
                }
                icon={<PlusOutlined />}
              >
                Frame
              </AntButton>
            </Col>
            <Col>
              <AntButton
                ref={(ref) =>
                  create(ref as unknown as HTMLDivElement, <TextNode />)
                }
                icon={<PlusOutlined />}
              >
                Text
              </AntButton>
            </Col>
            <Col>
              <AntButton
                icon={<PlusOutlined />}
                onClick={() => setDrawVisible(true)}
              >
                Charts
              </AntButton>
            </Col>
          </Row>
        </Col>
        <Col>
          <Display />
        </Col>
        <Col>
          <Row gutter={[20, 0]}>
            <Col>
              <Todo />
            </Col>
            <Col>
              <Tooltip title={'Preview'}>
                <PlayCircleOutlined
                  className={'toolbar-icon'}
                  onClick={() => window.open('/preview', '_blank')}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title={'Share'}>
                <LinkOutlined className={'toolbar-icon'} />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title={'Save'}>
                <SaveOutlined className={'toolbar-icon'} />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title={'Setting'}>
                <SettingOutlined className={'toolbar-icon'} />
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    </ToolbarStyled>
  );
};
