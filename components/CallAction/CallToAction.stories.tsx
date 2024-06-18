import { Meta, Story } from '@storybook/react';
import React from 'react';
import CallToAction, { CallToActionProps } from './CallToAction';

export default {
  title: 'Components/CallToAction',
  component: CallToAction,
  argTypes: {
      intent: {
        options: ['primary', 'secondary'],
        control: { type: 'select' },
      },
    display: {
      control: {
      
        type: 'select',
        options: ['desktop', 'mobile', 'hidden'],
      },
      defaultValue: 'desktop',
    },
    phoneNumber: {
      control: 'text',
      defaultValue: '1234567890',
    },
    callToActionText: {
      control: 'text',
      defaultValue: 'Call Now',
    },
  },
} as Meta;

const Template: Story<CallToActionProps> = (args) => <CallToAction {...args} />;

export const ToggleView = Template.bind({});
ToggleView.args = {
  display: 'hidden',
  phoneNumber: '1234567890',
  ctaMessage: 'Call Now',
};
