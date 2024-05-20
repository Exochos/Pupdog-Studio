import type { Meta, Story } from "@storybook/react"
import { NavBar, NavBarProps } from "./NavBar"

// Define meta information for the NavBar component
const meta: Meta<typeof NavBar> = {
  title: "Components/NavBar",
  component: NavBar,
  argTypes: {
    contactName: { control: 'text' },
  },
  args: {
    contactName: "Contact Us",
  },
}

export default meta

// Define the story for the NavBar component
const Template: Story<NavBarProps> = (args) => <NavBar {...args} />

export const Default = Template.bind({})
Default.args = {
  contactName: "Contact Us",
}
