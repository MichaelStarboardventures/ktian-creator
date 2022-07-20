import { Tool } from '@/components/resolver';
import { Settings as CommonSettings } from '@/components/settings';
import { SettingsProps } from '@/interfaces';
import ProTable from '@ant-design/pro-table';
import { useNode, UserComponent } from '@craftjs/core';
import styled from 'styled-components';

const TableWrapStyle = styled.div<SettingsProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export const Table: UserComponent<SettingsProps> = ({ width, height }) => {
  return (
    <Tool>
      <TableWrapStyle width={width} height={height}>
        <ProTable />
      </TableWrapStyle>
    </Tool>
  );
};

const Settings = () => {
  const {
    node,
    actions: { setProp },
  } = useNode((node) => ({
    props: node.data.props,
    node,
  }));

  return (
    <>
      <CommonSettings node={node} setProp={setProp} />
    </>
  );
};

Table.craft = {
  displayName: 'Table',
  related: {
    settings: Settings,
  },
};
