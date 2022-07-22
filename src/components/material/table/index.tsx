import { Properties } from '@/components/properties';
import { Tool } from '@/components/resolver';
import { Settings as CommonSettings } from '@/components/settings';
import { SettingsProps } from '@/interfaces';
import { ProColumns } from '@ant-design/pro-components';
import ProTable from '@ant-design/pro-table';
import { UserComponent } from '@craftjs/core';
import { request } from '@umijs/max';
import { useState } from 'react';

type TableDataProps = {
  key: string;
  providerId: string;
  providerAddress: string;
  accountOnboardingTime: string;
  rawBytePower: string;
  qualityAdjustedPower: string;
  verifiedDeals: string;
  notaryHeadcount: string;
  clientHeadcount: string;
};

const columns: ProColumns[] = [
  {
    dataIndex: 'providerId',
    index: 0,
    key: 'providerId',
    title: 'Provider ID',
  },
  {
    dataIndex: 'providerAddress',
    index: 1,
    key: 'providerAddress',
    title: 'Provider Address',
  },
  {
    dataIndex: 'accountOnboardingTime',
    index: 2,
    key: 'accountOnboardingTime',
    title: 'Account Onboarding Time',
  },
  {
    dataIndex: 'rawBytePower',
    index: 3,
    key: 'rawBytePower',
    title: 'Raw Byte Power (TiB)',
  },
  {
    dataIndex: 'qualityAdjustedPower',
    index: 4,
    key: 'qualityAdjustedPower',
    title: 'Quality Adjusted Power (TiB)',
  },
  {
    dataIndex: 'verifiedDeals',
    index: 5,
    key: 'verifiedDeals',
    title: 'Verified Deals (TiB)',
  },
  {
    dataIndex: 'notaryHeadcount',
    index: 6,
    key: 'notaryHeadcount',
    title: 'Notary Headcount',
  },
  {
    dataIndex: 'clientHeadcount',
    index: 7,
    key: 'clientHeadcount',
    title: 'Client Headcount',
  },
];

export const Table: UserComponent<SettingsProps> = ({ width, height }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Tool>
      <Properties width={width} height={height}>
        <ProTable
          search={false}
          tableStyle={{ height: 350, overflow: 'auto' }}
          loading={loading}
          columns={columns}
          request={async () => {
            try {
              setLoading(true);
              const res = await request<{
                data: { records: TableDataProps[] };
              }>('https://observable-api-dev.starboard.ventures/api/actors', {
                method: 'get',
                params: {
                  id: '1',
                },
              });
              setLoading(false);

              return {
                data: res?.data?.records?.map((ret, index) => {
                  ret.key = index + '';

                  return ret;
                }),
                success: true,
              };
            } catch (e) {
              setLoading(false);
              return {
                data: [],
                success: false,
              };
            }
          }}
        />
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
