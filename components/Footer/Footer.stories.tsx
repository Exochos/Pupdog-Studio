import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FOOTER_LINKS } from './constants';
import { Footer } from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
} as Meta;

// eslint-disable-next-line react/no-children-prop
const Template: Story = (args) => <Footer children={undefined} {...args} />;

export const Default = Template.bind({});
