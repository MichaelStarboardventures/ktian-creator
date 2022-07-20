import { Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ContainerStyled = styled(Row)`
  height: calc(100vh - 78px);

  & .layouts-content {
    padding: 24px;
    background-color: #f5f5f5;
  }
`;

export const Container: React.FC = ({ children }) => {
  return <ContainerStyled>{children}</ContainerStyled>;
};
