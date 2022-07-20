import { Context } from '@/components/provider';
import { styled } from '@mui/material';
import React, { useContext } from 'react';

const DrawerWidth = 300;

const WrapperStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ open, theme }) => ({
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: 0,
  ...(open && {
    marginLeft: `${DrawerWidth}px`,
  }),
}));

export const Wrapper: React.FC = ({ children }) => {
  const { drawVisible } = useContext(Context);

  return <WrapperStyled open={drawVisible}>{children}</WrapperStyled>;
};
