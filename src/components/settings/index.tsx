import { SettingsProps } from '@/interfaces';
import { useNode } from '@craftjs/core';
import { Divider } from '@mui/material';
import { Item } from './item';

export const Settings = () => {
  const {
    props,
    actions: { setProp },
    dom,
  } = useNode((node) => ({
    props: node.data.props,
    dom: node.dom,
  }));

  return (
    <>
      <>
        <h6>Properties</h6>
        <Item
          label={'Width'}
          content={
            <>
              <span
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(event) =>
                  setProp(
                    (props: SettingsProps) =>
                      (props.width = event.target
                        .textContent as SettingsProps['width']),
                  )
                }
              >
                {props.width || dom?.clientWidth}
              </span>
              {' px'}
            </>
          }
        />
        <Item
          label={'Height'}
          content={
            <>
              <span
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(event) =>
                  setProp(
                    (props: SettingsProps) =>
                      (props.height = event.target
                        .textContent as SettingsProps['height']),
                  )
                }
              >
                {props.height || dom?.clientHeight}
              </span>
              {' px'}
            </>
          }
        />
      </>
      <Divider />
      <>
        <h6>Typography</h6>
        {props.fontFamily && (
          <Item
            label={'Font'}
            content={
              <>
                <span>{props.fontFamily}</span>
              </>
            }
          />
        )}
        {props.fontWeight && (
          <Item
            label={'Weight'}
            content={
              <>
                <span
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(event) =>
                    setProp(
                      (props: SettingsProps) =>
                        (props.fontWeight = event.target
                          .textContent as SettingsProps['fontWeight']),
                    )
                  }
                >
                  {props.fontWeight}
                </span>
              </>
            }
          />
        )}
        {props.fontSize && (
          <Item
            label={'Size'}
            content={
              <>
                <span
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(event) =>
                    setProp(
                      (props: SettingsProps) =>
                        (props.fontSize = event.target
                          .textContent as SettingsProps['fontSize']),
                    )
                  }
                >
                  {props.fontSize}
                </span>
                {' px'}
              </>
            }
          />
        )}
        {props.lineHeight && (
          <Item
            label={'Line height'}
            content={
              <>
                <span
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(event) =>
                    setProp(
                      (props: SettingsProps) =>
                        (props.lineHeight = event.target
                          .textContent as SettingsProps['lineHeight']),
                    )
                  }
                >
                  {props.lineHeight}
                </span>
                {' px'}
              </>
            }
          />
        )}
      </>
      <Divider />
    </>
  );
};
