import { Display as DisplayProps } from '@/models/display';
import {
  DesktopMacOutlined,
  PhoneIphoneOutlined,
  SvgIconComponent,
  TabletOutlined,
} from '@mui/icons-material';
import { Col, Row } from 'antd';
import { useModel } from 'umi';

type DisplayData = {
  label: string;
  value: DisplayProps;
  icon: SvgIconComponent;
};

export const Display = () => {
  const { setDisplay } = useModel('display');
  const displays: DisplayData[] = [
    {
      label: 'desktop',
      value: 'desktop',
      icon: DesktopMacOutlined,
    },
    {
      label: 'pad',
      value: 'pad',
      icon: TabletOutlined,
    },
    {
      label: 'mobile',
      value: 'mobile',
      icon: PhoneIphoneOutlined,
    },
  ];

  return (
    <Row gutter={[20, 0]} justify={'center'}>
      {displays.map((display) => {
        const Icon = display.icon;

        return (
          <Col key={display.value}>
            <Icon
              className={'toolbar-icon'}
              onClick={() => setDisplay(display.value)}
            />
          </Col>
        );
      })}
    </Row>
  );
};
