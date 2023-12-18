"use client";

import ClaimModal from "@/components/ClaimModal/ClaimModal";
import CreateCategoryFormModal from "@/components/CreateCategoryForm/CreateCategoryFormModal";
import CreateProductFormModal from "@/components/CreateProductForm/CreateProductFormModal";
import CreateStaffFormModal from "@/components/CreateStaffForm/CreateStaffFormModal";
import UpdateCategoryFormModal from "@/components/UpdateCategoryForm/UpdateCategoryFormModal";
import UpdateProductFormModal from "@/components/UpdateProductForm/UpdateProductFormModal";
import UpdateStaffFormModal from "@/components/UpdateStaffForm/UpdateStaffFormModal";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { ReactNode, createContext, useState } from "react";

export function ModalProvider({ children }: ReactNodeChildren) {
    const [modalState, setModalState] = useState<IModalState>(
        defaultModalStateValue,
    );

    return (
        <ModalStateContext.Provider
            value={{
                modalState,
                setModalState: (d) => {
                    setModalState((prev) => ({ ...prev, ...d }));
                },
            }}
        >
            {children}
            <CreateProductFormModal />
            <UpdateProductFormModal />
            <CreateCategoryFormModal />
            <UpdateCategoryFormModal />
            <CreateStaffFormModal />
            <UpdateStaffFormModal />
            <ClaimModal />
        </ModalStateContext.Provider>
    );
}

export const defaultModalStateValue = {
    addProduct: { isOpen: false },
    addStaff: { isOpen: false },
    updateStaff: { isOpen: false },
    updateProduct: { isOpen: false },
    addCategory: { isOpen: false },
    updateCategory: { isOpen: false },
    claim: { isOpen: false },
};

export const ModalStateContext = createContext<IModalStateContext>({
    modalState: defaultModalStateValue,
    setModalState: () => {},
});

export type IModalStateContext = {
    modalState: IModalState;
    setModalState: (d: {
        [modal in keyof Partial<IModalState>]: IModalState[modal];
    }) => any;
};

export type IModalState = {
    addProduct: IModalStateItem;
    addStaff: IModalStateItem;
    updateStaff: IModalStateItem & { staffId?: string };
    updateProduct: IModalStateItem & { productId?: string };
    addCategory: IModalStateItem;
    updateCategory: IModalStateItem & { categoryId?: string };
    claim: IModalStateItem & {
        message?: ReactNode;
        onResponse?: (confirm: boolean) => any;
    };
};

export type IModalStateItem = {
    isOpen: boolean;
    refetch?: () => any;
};
