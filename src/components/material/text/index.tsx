import { Properties } from '@/components/properties';
import { Tool } from '@/components/resolver';
import { Settings as CommonSettings } from '@/components/settings';
import { Item } from '@/components/settings/item';
import { SettingsProps } from '@/interfaces';
import { useNode, UserComponent } from '@craftjs/core';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export type TextProps = {
  children?: ReactNode;
} & SettingsProps;

export const Text: UserComponent<TextProps> = ({
  children,
  width,
  height,
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
}) => {
  return (
    <Tool>
      <Properties width={width} height={height}>
        <Typography
          variant={'h6'}
          fontSize={fontSize + 'px'}
          lineHeight={lineHeight + 'px'}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
        >
          {children}
        </Typography>
      </Properties>
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
      <>
        <h6>Content</h6>
        <Item
          content={
            <span
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(event) =>
                setProp(
                  (props: SettingsProps) =>
                    (props.children = event.target
                      .textContent as SettingsProps['height']),
                )
              }
            >
              {props.children}
            </span>
          }
        />
      </>
    </>
  );
};

Text.craft = {
  displayName: 'Text',
  defaultProps: {
    children: 'Text',
    fontSize: '20',
    fontFamily: 'Roboto',
    fontWeight: '600',
    lineHeight: '30',
  },
  related: {
    settings: Settings,
  },
};
