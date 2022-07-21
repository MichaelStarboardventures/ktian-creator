import { Grid, ListItemButton, ListItemText, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

export type ItemProps = {
  label?: string;
  content: ReactNode;
};

export const Item: React.FC<ItemProps> = ({ label, content }) => {
  return (
    <ListItemButton dense>
      <Grid container>
        {label && (
          <Grid item xs={6} md={6} lg={6}>
            <ListItemText
              primary={
                <Typography color={'darkgray'} fontSize={'14px'}>
                  {label}
                </Typography>
              }
            />
          </Grid>
        )}
        <Grid item xs={6} md={6} lg={6}>
          <ListItemText
            primary={<Typography fontSize={'14px'}>{content}</Typography>}
          />
        </Grid>
      </Grid>
    </ListItemButton>
  );
};
