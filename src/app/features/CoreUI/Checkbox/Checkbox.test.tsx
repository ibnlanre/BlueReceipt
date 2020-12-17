import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Checkbox from './Checkbox';

const testValue = 'Labelled';

describe('Checkbox', () => {
  afterEach(cleanup);

  it('displays label', () => {
    const { getByText } = render(<Checkbox value={testValue} />);
    const element = getByText(testValue);
    expect(element).toBeInTheDocument();
  });
});
