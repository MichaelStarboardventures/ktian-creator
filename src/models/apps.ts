import React, { useCallback, useEffect, useMemo, useState } from 'react';

export type App = {
  id: string;
  label: string;
  value: string;
};

export const useApps = (apps: App[]) => {
  return useMemo(() => {
    if (!apps?.length) return [];

    return apps.map((app) => ({
      ...app,
      label: app.label,
      value: app.label,
    }));
  }, [apps]);
};

export const useCurrentApp = (
  apps: App[],
  setApps: React.Dispatch<React.SetStateAction<App[]>>,
) => {
  return useCallback(
    (id: string, content: string) => {
      if (!apps.length) return;

      setApps((apps) => {
        return apps.map((ret) => {
          if (ret.id === id) {
            ret.label = content;
          }

          return ret;
        });
      });
    },
    [apps],
  );
};

export const useDeleteApp = (
  setApps: React.Dispatch<React.SetStateAction<App[]>>,
) => {
  return useCallback((id: string) => {
    setApps((apps) =>
      apps.filter((app) => {
        return app.id !== id;
      }),
    );
  }, []);
};

export default () => {
  const [apps, setApps] = useState<App[]>([
    { id: String(new Date().getTime()), label: 'new app', value: 'new app' },
  ]);
  const [app, setApp] = useState<App | null>(null);

  const retApps = useApps(apps);
  const retSetCurrentApp = useCurrentApp(apps, setApps);
  const retDeleteApp = useDeleteApp(setApps);

  useEffect(() => {
    if (apps.length) setApp(apps[apps.length - 1]);
  }, [apps]);

  return {
    apps: retApps,
    setApps,
    app,
    setApp,
    setCurrentApp: retSetCurrentApp,
    delete: retDeleteApp,
  };
};
