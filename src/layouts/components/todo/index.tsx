import { useEditor } from '@craftjs/core';
import { RedoOutlined, UndoOutlined } from '@mui/icons-material';
import { Col, Row, Tooltip } from 'antd';

export const Todo = () => {
  const {
    canUndo,
    canRedo,
    actions: { history },
  } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
    <Row gutter={[10, 0]}>
      <Col onClick={() => history.undo()}>
        <Tooltip title={'Undo'}>
          <UndoOutlined color={canUndo ? 'inherit' : 'disabled'} />
        </Tooltip>
      </Col>
      <Col onClick={() => history.redo()}>
        <Tooltip title={'Redo'}>
          <RedoOutlined color={canRedo ? 'inherit' : 'disabled'} />
        </Tooltip>
      </Col>
    </Row>
  );
};
