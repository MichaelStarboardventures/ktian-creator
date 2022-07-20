import { Tool } from '@/components/resolver';
import { UserComponent } from '@craftjs/core';
import { Button as MuiButton } from '@mui/material';

export const Button: UserComponent = ({ children }) => {
  return (
    <Tool>
      <MuiButton disableElevation variant={'contained'}>
        {children}
      </MuiButton>
    </Tool>
  );
};
