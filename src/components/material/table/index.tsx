import { Properties } from '@/components/properties';
import { Tool } from '@/components/resolver';
import { Settings as CommonSettings } from '@/components/settings';
import { SettingsProps } from '@/interfaces';
import ProTable from '@ant-design/pro-table';
import { UserComponent } from '@craftjs/core';

export const Table: UserComponent<SettingsProps> = ({ width, height }) => {
  return (
    <Tool>
      <Properties width={width} height={height}>
        <ProTable />
      </Properties>
    </Tool>
  );
};

const Settings = () => {
  return (
    <>
      <CommonSettings />
    </>
  );
};

Table.craft = {
  displayName: 'Table',
  related: {
    settings: Settings,
  },
};
