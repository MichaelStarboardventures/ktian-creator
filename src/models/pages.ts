import { useCallback, useMemo, useState } from 'react';
import { history } from 'umi';

export type Page = {
  name: string;
  path?: string;
  content?: string | Record<string, any>;
};

const usePages = (pages: Page[]): Page[] => {
  return useMemo(() => {
    return pages?.map((page) => ({
      ...page,
      path: '/' + page?.name?.trim(),
      content: page?.content || {
        ROOT: {
          type: { resolvedName: 'Stagger' },
          isCanvas: false,
          props: {},
          displayName: 'Stagger',
          custom: {},
          hidden: false,
          nodes: [],
          linkedNodes: { stagger: 'QviKWQcwrA' },
        },
        QviKWQcwrA: {
          type: 'div',
          isCanvas: true,
          props: { style: { width: '100%', height: '100%' } },
          displayName: 'div',
          parent: 'ROOT',
          hidden: false,
          nodes: [],
          linkedNodes: {},
        },
      },
    }));
  }, [pages]);
};

export default () => {
  const [pages, setPages] = useState<Page[]>([
    { path: '/page1', name: 'page1', content: '' },
  ]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  const retPages = usePages(pages);
  const retSetCurrentPage = useCallback((page: Page) => {
    setCurrentPage(page);

    history?.push(page?.path as string);
  }, []);

  return {
    pages: retPages,
    setPages,
    currentPage,
    setCurrentPage: retSetCurrentPage,
  };
};
