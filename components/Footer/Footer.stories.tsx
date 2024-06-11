import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Footer } from './Footer';
import { FOOTER_LINKS } from '../../Data/constants';

export default {
  title: 'Components/Footer',
  component: Footer,
} as Meta;

// eslint-disable-next-line react/no-children-prop
const Template: Story = (args) => <Footer children={undefined} {...args} />;

// eslint-disable-next-line array-callback-return
FOOTER_LINKS.map((link) => {
  Template.args = {
    children: link.name,
  };
});
export const Default = Template.bind({});
