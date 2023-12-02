import type { Meta, StoryObj } from "@storybook/react";

import NotifyModal from "./NotifyModal";

const meta = {
    title: "Components/Modal/NotifyModal",
    component: NotifyModal,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof NotifyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        openModal: true,
    },
};
