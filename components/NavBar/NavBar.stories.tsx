import type { Meta, StoryObj } from "@storybook/react"
import { NavBar } from "./NavBar"

const meta: Meta<typeof NavBar> = {
  title: "NavBar",
  component: NavBar,
  args: {
    children: "NavBar",
  },
}

type Story = StoryObj<typeof NavBar>

export const Default: Story = {
  render: (args) => <NavBar {...args} />,
}

export default meta