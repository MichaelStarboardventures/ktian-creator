import { Container, Tool } from '@/components/resolver';
import { Element, UserComponent } from '@craftjs/core';
import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

const FrameStyled = styled.div`
  padding: 24px;
  background-color: #fff;
`;

type FrameProps = {
  children?: ReactNode;
  spacing?: number[];
  direction?: CSSProperties['direction'];
  justifyContent?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  display?: CSSProperties['display'];
};

export const Frame: UserComponent<FrameProps> = ({ children }) => {
  return (
    <Tool>
      <FrameStyled>
        <Element id={'frame'} is={Container} canvas>
          {children}
        </Element>
      </FrameStyled>
    </Tool>
  );
};

Frame.craft = {
  displayName: 'Frame',
};
