import { Container, Tool } from '@/components/resolver';
import { Element, UserComponent } from '@craftjs/core';
import React, { CSSProperties, ReactNode } from 'react';

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
      <Element
        id={'frame'}
        is={Container as React.FC}
        canvas
        custom={{
          css: {
            padding: '24px',
            backgroundColor: '#fff',
          },
        }}
      >
        {children}
      </Element>
    </Tool>
  );
};

Frame.craft = {
  displayName: 'Frame',
};
