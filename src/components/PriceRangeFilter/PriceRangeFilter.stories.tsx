import type { Meta, StoryObj } from "@storybook/react";

import PriceRangeFilter from "./PriceRangeFilter";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Query, QueryClient, QueryClientProvider } from "react-query";

const meta = {
    title: "Components/Filter/PriceRangeFilter",
    component: PriceRangeFilter,
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
} satisfies Meta<typeof PriceRangeFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
