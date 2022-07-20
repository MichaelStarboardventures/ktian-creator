import { SettingsProps } from '@/interfaces';
import styled from 'styled-components';

export const Properties = styled.div<SettingsProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
