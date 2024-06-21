import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
