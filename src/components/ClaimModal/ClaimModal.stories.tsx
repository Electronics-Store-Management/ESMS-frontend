import type { Meta, StoryObj } from "@storybook/react";

import ClaimModal from "./ClaimModal";
import {
    ModalProvider,
    ModalStateContext,
    defaultModalStateValue,
} from "@/contexts/ModalContext";

const meta = {
    title: "Components/Modal/ClaimModal",
    component: ClaimModal,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <ModalStateContext.Provider
                value={{
                    modalState: defaultModalStateValue,
                    setModalState: (d) => {},
                }}
            >
                {Story()}
            </ModalStateContext.Provider>
        ),
    ],
    argTypes: {},
} satisfies Meta<typeof ClaimModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
