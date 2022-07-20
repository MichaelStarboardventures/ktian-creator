import { Element, Frame, useEditor } from '@craftjs/core';
import { useEffect } from 'react';
import { useModel } from 'umi';

export default function Index() {
  const { currentPage } = useModel('pages');
  const {
    actions: { deserialize },
  } = useEditor();

  useEffect(() => {
    if (currentPage) {
      deserialize(currentPage?.content as string);
    }
  }, [currentPage]);

  return (
    <Frame data={currentPage?.content}>
      <Element id={'stagger'} is={'div'} style={{ height: '100%' }} canvas />
    </Frame>
  );
}
