import type { Meta, StoryObj } from "@storybook/react";

import CategoryFilter from "./CategoryFilter";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Query, QueryClient, QueryClientProvider } from "react-query";

const meta = {
    title: "Components/Filter/CategoryFilter",
    component: CategoryFilter,
    parameters: {
        layout: "centered",
        nextjs: { appDirectory: true },
        nextRouter: {
            Provider: AppRouterContext.Provider,
        },
    },
    decorators: [
        (Story) => (
            <QueryClientProvider client={new QueryClient()}>
                {Story()}
            </QueryClientProvider>
        ),
    ],
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof CategoryFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
