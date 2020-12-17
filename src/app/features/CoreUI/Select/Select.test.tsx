import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Select from './Select';

const dummyText = 'Label';
const normalSample = [{ value: 'Duplicate' }, { value: 'Delete', color: true }];

describe('Select', () => {
  afterEach(cleanup);

  it('displays placeholder text', () => {
    const { getByText } = render(
      <Select open options={normalSample} />,
    );
    const element = getByText(dummyText);
    expect(element).toBeInTheDocument();
  });
});
