import { TypographyProps } from '@mui/material';

export type SettingsProps = Omit<TypographyProps, 'align'> & {
  width?: string | null;
  height?: string | null;
};
