import { Display } from '@/models/display';
import { useModel } from '@@/exports';
import { Element } from '@craftjs/core';
import { Paper } from '@mui/material';
import { useMemo } from 'react';
import styled from 'styled-components';

const useDisplay = (display: Display) => {
  return useMemo(() => {
    switch (display) {
      case 'desktop':
        return { width: '100%', height: '100%' };

      case 'pad':
        return { width: '1180px', height: '820px' };

      case 'mobile':
        return { width: '375px', height: '667px' };

      default:
        return { width: '100%', height: '100%' };
    }
  }, [display]);
};

const StaggerStyled = styled(Paper)<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 0 auto;
  background-color: #f5f5f5;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Stagger = () => {
  const { display } = useModel('display');
  const css = useDisplay(display);

  return (
    <StaggerStyled {...css}>
      <Element
        canvas
        id={'stagger'}
        is={'div'}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </StaggerStyled>
  );
};
