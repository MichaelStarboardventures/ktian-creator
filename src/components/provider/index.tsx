import React, { useState } from 'react';

export type Page = {
  name: string;
  path?: string;
  content?: string;
};

export type ContextProps = {
  drawVisible: boolean;
  setDrawVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Context = React.createContext<ContextProps>({
  drawVisible: false,
  setDrawVisible: () => {},
});

export const Provider: React.FC = ({ children }) => {
  const [drawVisible, setDrawVisible] = useState(false);

  return (
    <Context.Provider value={{ setDrawVisible, drawVisible }}>
      {children}
    </Context.Provider>
  );
};
