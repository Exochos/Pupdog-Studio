// components/CallToAction.stories.tsx
import { Meta, Story } from '@storybook/react';
import React from 'react';
import CallToAction from './CallToAction';

export default {
  title: 'Components/CallToAction',
  component: CallToAction,
} as Meta;

const Template: Story = (args) => <CallToAction {...args} />;

export const Default = Template.bind({});
Default.args = {};
