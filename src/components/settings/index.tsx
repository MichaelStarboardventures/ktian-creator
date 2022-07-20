import { Node } from '@craftjs/core';
import { Divider, ListItemButton, ListItemText } from '@mui/material';

type Callback = (props: Record<string, any>) => void;

export const Settings = ({
  node,
  setProp,
}: {
  node: Node;
  setProp: (callback: Callback) => void;
}) => {
  if (!node) return null;

  const {
    data: { props },
    dom,
  } = node;

  return (
    <>
      <>
        <h6>Properties</h6>
        <ListItemButton>
          <ListItemText primary={'Width'} />
          <ListItemText>
            <span
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(event) =>
                setProp((props) => (props.width = event.target.textContent))
              }
            >
              {props.width || dom?.clientWidth}
            </span>
            {' px'}
          </ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary={'Height'} />
          <ListItemText>
            <span
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(event) =>
                setProp((props) => (props.height = event.target.textContent))
              }
            >
              {props.height || dom?.clientHeight}
            </span>
            {' px'}
          </ListItemText>
        </ListItemButton>
      </>
      <Divider />
    </>
  );
};
