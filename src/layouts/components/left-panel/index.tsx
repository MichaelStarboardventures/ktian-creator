import { Page } from '@/models/pages';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Layers } from '@craftjs/layers';
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { Col, Input, Row } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { useModel } from 'umi';

const LeftPanelStyled = styled(Paper)`
  height: 100%;
`;

const PagesHeaderStyled = styled(Row)`
  height: 40px;
  padding: 0 10px;

  & h4 {
    margin: 0;
  }
`;

const PagesContainerStyled = styled.div`
  & .pages-list-container {
    min-height: 250px;
    max-height: 300px;
    overflow: auto;
    overflow-x: hidden;
    font-size: 16px;
    margin-bottom: 25px;
  }
`;

const PageItem = ({
  status = true,
  index,
  page,
}: {
  status: boolean;
  index: number;
  page: Page;
}) => {
  const [editable, setEditable] = useState(status);
  const { setPages, setCurrentPage } = useModel('pages');

  return editable ? (
    <Input
      value={page.name}
      autoFocus
      onChange={(e) => {
        setPages((pages) => {
          return pages?.map((ret, idx) => {
            if (idx === index) {
              ret.name = e.target.value;
            }

            return ret;
          });
        });
      }}
      onBlur={() => {
        setEditable(false);
        setCurrentPage(page);
      }}
    />
  ) : (
    <ListItemText
      primary={page?.name}
      onDoubleClick={() => {
        setEditable(true);
      }}
    />
  );
};

const PageList = () => {
  const { pages, currentPage, setCurrentPage } = useModel('pages');

  return (
    <List className={'pages-list-container'}>
      {pages?.map((page, idx) => (
        <ListItemButton
          key={idx}
          selected={currentPage?.name === page?.name}
          onClick={() => {
            setCurrentPage(page);
          }}
        >
          <ListItemIcon>
            {currentPage?.name === page?.name && <CheckOutlined />}
          </ListItemIcon>
          <PageItem status={true} index={idx} page={page} />
        </ListItemButton>
      ))}
    </List>
  );
};

const Pages = () => {
  const { setPages } = useModel('pages');

  return (
    <PagesContainerStyled>
      <PagesHeaderStyled justify={'space-between'} align={'middle'}>
        <Col>
          <h4>Pages</h4>
        </Col>
        <Col
          onClick={() => {
            setPages((pages) => [
              ...pages,
              {
                name: `page${pages.length + 1}`,
                path: `/page${pages.length + 1}`,
              },
            ]);
          }}
        >
          <PlusOutlined />
        </Col>
      </PagesHeaderStyled>
      <Divider />
      <PageList />
    </PagesContainerStyled>
  );
};

export const LeftPanel = () => {
  return (
    <LeftPanelStyled>
      <Pages />
      <Layers />
    </LeftPanelStyled>
  );
};
