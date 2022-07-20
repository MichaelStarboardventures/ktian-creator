import { Tool } from '@/components/resolver';
import { Settings as CommonSettings } from '@/components/settings';
import { SettingsProps } from '@/interfaces';
import { useNode, UserComponent } from '@craftjs/core';
import { MenuItem, Stack, TextField } from '@mui/material';
import { Col, Row } from 'antd';
import React, { CSSProperties, ReactElement } from 'react';
import styled, { StyledComponent } from 'styled-components';

export type ContainerProps = {
  spacing?: number;
  justify?: CSSProperties['justifyContent'];
  align?: 'top' | 'middle' | 'bottom';
  display?: CSSProperties['display'];
} & SettingsProps;

const StaggerBlockStyled = styled.div<SettingsProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => (height ? height + 'px' : '100%')};
  min-height: 200px;
`;

const StaggerRowStyled = styled(Row)<SettingsProps>`
  height: 100%;
  min-height: 200px;
`;

export const FlexChildComponent: React.FC = ({ children }) => {
  const child = (children as ReactElement)?.props?.children;

  if (!child) return null;

  return React.Children.map(child, (item) => {
    const com = <Col span={Math.floor(24 / child?.length)}>{item}</Col>;

    return React.cloneElement(com, { ...item.props });
  });
};

export const Container: UserComponent<ContainerProps> = ({
  children,
  display,
  justify,
  align,
  spacing,
  width,
  height,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const Com = (display === 'block'
    ? StaggerBlockStyled
    : StaggerRowStyled) as unknown as StyledComponent<any, any>;
  const props =
    display === 'block'
      ? { width, height }
      : { justify, align, spacing, gutter: [spacing, spacing], width, height };

  return (
    <Tool>
      <Com
        ref={(ref: HTMLDivElement) => connect(drag(ref as HTMLDivElement))}
        {...props}
      >
        {display === 'block' ? (
          children
        ) : (
          <FlexChildComponent>{children}</FlexChildComponent>
        )}
      </Com>
    </Tool>
  );
};

const Settings = () => {
  const {
    props,
    actions: { setProp },
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <>
      <CommonSettings />
      <Stack direction={'column'} spacing={2} py={1} px={2}>
        <TextField
          margin={'dense'}
          select
          variant={'outlined'}
          label={'Display'}
          value={props.display}
          onChange={(event) =>
            setProp(
              (props: ContainerProps) => (props.display = event.target.value),
            )
          }
          fullWidth
        >
          <MenuItem value={'block'}>Block</MenuItem>
          <MenuItem value={'flex'}>Flex</MenuItem>
        </TextField>
        {props.display === 'flex' ? (
          <>
            <TextField
              margin={'dense'}
              fullWidth
              variant={'outlined'}
              label={'Spacing'}
              type={'number'}
              value={props.spacing}
              onChange={(event) =>
                setProp(
                  (props: ContainerProps) =>
                    (props.spacing = Number(event.target.value)),
                )
              }
            />
            <TextField
              margin={'dense'}
              select
              fullWidth
              variant={'outlined'}
              label={'Align'}
              value={props.align}
              onChange={(event) =>
                setProp(
                  (props: ContainerProps) =>
                    (props.align = event.target
                      .value as ContainerProps['align']),
                )
              }
            >
              <MenuItem value={'top'}>top</MenuItem>
              <MenuItem value={'middle'}>middle</MenuItem>
              <MenuItem value={'bottom'}>bottom</MenuItem>
            </TextField>
            <TextField
              margin={'dense'}
              select
              fullWidth
              variant={'outlined'}
              label={'JustifyContent'}
              value={props.justify}
              onChange={(event) =>
                setProp(
                  (props: ContainerProps) =>
                    (props.justify = event.target.value),
                )
              }
            >
              <MenuItem value={'start'}>start</MenuItem>
              <MenuItem value={'end'}>end</MenuItem>
              <MenuItem value={'center'}>center</MenuItem>
              <MenuItem value={'space-between'}>space-between</MenuItem>
              <MenuItem value={'space-around'}>space-around</MenuItem>
            </TextField>
          </>
        ) : null}
      </Stack>
    </>
  );
};

Container.craft = {
  displayName: 'Container',
  related: {
    settings: Settings,
  },
  defaultProps: {
    display: 'block',
    justify: 'start',
    align: 'top',
    spacing: 0,
  },
};
