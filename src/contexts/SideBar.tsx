import { create } from "zustand";

export interface ISideBarState {
    isCollapse?: boolean;
    setIsCollapse: (value: boolean | ((v: boolean) => boolean)) => any;
}

export const useSideBarState = create<ISideBarState>()((set) => ({
    isCollapse: undefined,
    setIsCollapse: (value: boolean | ((v: boolean) => boolean)) => {
        if (value instanceof Function)
            set((state) => ({ isCollapse: value(state?.isCollapse || false) }));
        else set((state) => ({ isCollapse: value }));
    },
}));
