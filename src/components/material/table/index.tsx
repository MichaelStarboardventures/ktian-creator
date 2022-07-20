import { Tool } from '@/components/resolver';
import ProTable from '@ant-design/pro-table';
import { UserComponent } from '@craftjs/core';

export const Table: UserComponent = () => {
  return (
    <Tool>
      <ProTable />
    </Tool>
  );
};

const Settings = () => {
  return <div>table settings</div>;
};

Table.craft = {
  displayName: 'Table',
  related: {
    settings: Settings,
  },
};
