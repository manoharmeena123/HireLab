'use client';
import React, { ReactNode } from 'react';

type ComponentWithProps = [React.ComponentType<any>, Record<string, any>?];

export const buildProvidersTree = (
  componentsWithProps: ComponentWithProps[],
) => {
  const initialComponent = ({ children }: { children: ReactNode }) => (
    <>{children}</>
  );
  return componentsWithProps.reduce(
    (AccumulatedComponents, [Provider, props = {}]: ComponentWithProps) => {
      return ({ children }: { children: ReactNode }) => (
        <AccumulatedComponents>
          <Provider {...props}>{children}</Provider>
        </AccumulatedComponents>
      );
    },
    initialComponent,
  );
};
