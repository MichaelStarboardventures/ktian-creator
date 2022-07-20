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
          type: 'div',
          isCanvas: true,
          props: { id: 'stagger', style: { height: '100%' } },
          displayName: 'Root',
          custom: {},
          hidden: false,
          linkedNodes: {},
        },
      },
    }));
  }, [pages]);
};

export default () => {
  const [pages, setPages] = useState<Page[]>([]);
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
