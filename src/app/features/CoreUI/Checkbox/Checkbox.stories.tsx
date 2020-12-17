import React from 'react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox';
import '../../App/Root/Root.scss';
import TwoColumnGrid from '../TwoColumnGrid/TwoColumnGrid';

export default {
  component: Checkbox,
  title: 'Checkbox',
};

export const All = () => (
  <TwoColumnGrid>
    <Checkbox onClick={action('clicked')} disabled={false} />
    <Checkbox disabled />
  </TwoColumnGrid>
);

export const Normal = () => (
  <Checkbox onClick={action('clicked')} disabled={false} />
);

export const Disabled = () => (
  <Checkbox disabled />
);
