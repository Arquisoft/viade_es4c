import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { mount } from 'enzyme';
import Login from './login-modal.component';

afterAll(cleanup);

describe('Login', () => {
  const { container, getByTestId } = render(
    <Login login={[{ component: () => <span>Test</span>, label: 'Test', id: 'test' }]} />
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
