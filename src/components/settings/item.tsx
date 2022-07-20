import { Grid, ListItemButton, ListItemText } from '@mui/material';
import React, { ReactNode } from 'react';

export type ItemProps = {
  label?: string;
  content: ReactNode;
};

export const Item: React.FC<ItemProps> = ({ label, content }) => {
  return (
    <ListItemButton>
      <Grid container>
        {label && (
          <Grid item xs={6} md={6} lg={6}>
            <ListItemText primary={label} />
          </Grid>
        )}
        <Grid item xs={6} md={6} lg={6}>
          <ListItemText>{content}</ListItemText>
        </Grid>
      </Grid>
    </ListItemButton>
  );
};
