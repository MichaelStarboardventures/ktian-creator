import { useState } from 'react';

export type Display = 'desktop' | 'pad' | 'mobile';

export default () => {
  const [display, setDisplay] = useState<Display>('desktop');

  return { display, setDisplay };
};
