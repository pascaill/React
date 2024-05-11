import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const mockStore = configureStore([]);
const store = mockStore({});

function AllTheProviders(params) {
  const { children } = params;

  const history = createMemoryHistory();

  return (
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        {children}
      </Router>
    </Provider>
  );
}

export * from '@testing-library/react';

export const customRender = (ui, options) => render(<AllTheProviders>{ui}</AllTheProviders>, {
  ...options,
});
