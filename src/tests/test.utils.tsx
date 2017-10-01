import React, { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import '../index.scss';
import store from '../redux/store';

const AllTheProviders: FC = ({ children }) => (
  <Provider store={store}>
    <React.StrictMode>
      {children}
    </React.StrictMode>
  </Provider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
