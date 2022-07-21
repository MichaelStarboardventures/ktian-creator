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
        return '100%';

      case 'pad':
        return '1180px';

      case 'mobile':
        return '375px';

      default:
        return '100%';
    }
  }, [display]);
};

const StaggerStyled = styled(Paper)<{ width: string }>`
  width: ${({ width }) => width};
  height: 100%;
  margin: 0 auto;
  background-color: #f5f5f5;
`;

export const Stagger = () => {
  const { display } = useModel('display');
  const displayWidth = useDisplay(display);

  return (
    <StaggerStyled width={displayWidth}>
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
