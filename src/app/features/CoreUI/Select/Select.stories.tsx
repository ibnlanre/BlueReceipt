import React from 'react';

import Select from './Select';
import '../../App/Root/Root.scss';
import TwoColumnGrid from '../TwoColumnGrid/TwoColumnGrid';

export default {
  component: Select,
  title: 'Select',
};

const multi = [{ value: 'Label 1' }, { value: 'Label 2' }, { value: 'Label 3' }];
const single = [{ value: 'Duplicate' }, { value: 'Delete', color: true }];

export const All = () => (
  <TwoColumnGrid>
    <Select />
    <Select open options={multi} checkbox />
    <Select open options={single} />
    <Select disabled />
  </TwoColumnGrid>
);

export const Normal = () => (
  <Select />
);

export const ActiveMulti = () => (
  <Select open options={multi} checkbox />
);

export const ActiveNormal = () => (
  <Select open options={single} />
);

export const Disabled = () => (
  <Select disabled />
);
