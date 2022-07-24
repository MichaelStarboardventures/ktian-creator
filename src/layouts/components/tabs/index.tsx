import { App } from '@/models/apps';
import {
  CloseCircleFilled,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Stack } from '@mui/material';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useModel } from 'umi';

const TabsStyled = styled(Stack)`
  height: 30px;
  background-color: #383838;
  line-height: 30px;

  & .tabs-item {
    position: relative;
    box-sizing: border-box;
    min-width: 100px;
    color: #fff;
    text-align: center;
    border: 1px solid #5a5a5a;
    cursor: default;

    &.tabs-item-plus {
      min-width: 30px;
      cursor: pointer;
    }

    &.selected {
      background-color: #5a5a5a;
    }

    & .tabs-item-del {
      position: absolute;
      top: 50%;
      right: 5px;
      display: none;
      transform: translateY(-50%);
      cursor: default;
    }

    &:hover .tabs-item-del {
      display: block;
    }
  }
`;

const TabPage = ({ page }: { page: App }) => {
  const { setApp, app, setCurrentApp, delete: deleteApp } = useModel('apps');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      contentEditable={true}
      suppressContentEditableWarning={true}
      className={`tabs-item ${app?.id === page.id ? 'selected' : ''}`}
      onClick={() => setApp(page)}
      onBlur={(event) => {
        setCurrentApp(page.id, event.currentTarget.textContent || '');
      }}
    >
      {page.label}
      <CloseCircleFilled
        className={'tabs-item-del'}
        onClick={() => deleteApp(page.id)}
      />
    </div>
  );
};

const TabsPages = () => {
  const { apps } = useModel('apps');

  return apps?.length ? (
    <>
      {apps?.map((ret) => (
        <TabPage key={ret.id} page={ret} />
      ))}
    </>
  ) : null;
};

export const Tabs = () => {
  const { setApps } = useModel('apps');

  return (
    <TabsStyled direction={'row'}>
      <div className={'tabs-item tabs-item-plus'}>
        <HomeOutlined />
      </div>
      <TabsPages />
      <div
        className={'tabs-item tabs-item-plus'}
        onClick={() => {
          setApps((apps) => [
            ...apps,
            {
              id: String(new Date().getTime()),
              label: 'new app',
              value: 'new app',
            },
          ]);
        }}
      >
        <PlusOutlined />
      </div>
    </TabsStyled>
  );
};
