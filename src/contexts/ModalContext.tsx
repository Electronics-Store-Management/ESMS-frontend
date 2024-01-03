"use client";

import ClaimModal from "@/components/ClaimModal/ClaimModal";
import CreateCategoryFormModal from "@/components/CreateCategoryForm/CreateCategoryFormModal";
import CreateProductFormModal from "@/components/CreateProductForm/CreateProductFormModal";
import CreateStaffFormModal from "@/components/CreateStaffForm/CreateStaffFormModal";
import CreateSupplierFormModal from "@/components/CreateSupplierForm/CreateSupplierFormModal";
import UpdateCategoryFormModal from "@/components/UpdateCategoryForm/UpdateCategoryFormModal";
import UpdateProductFormModal from "@/components/UpdateProductForm/UpdateProductFormModal";
import UpdateStaffFormModal from "@/components/UpdateStaffForm/UpdateStaffFormModal";
import UpdateSupplierFormModal from "@/components/UpdateSupplierForm/UpdateSupplierFormModal";
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
            <CreateCategoryFormModal />
            <CreateStaffFormModal />
            <CreateSupplierFormModal />

            <UpdateProductFormModal />
            <UpdateCategoryFormModal />
            <UpdateStaffFormModal />
            <UpdateSupplierFormModal />

            <ClaimModal />
        </ModalStateContext.Provider>
    );
}

export const defaultModalStateValue = {
    addProduct: { isOpen: false },
    addCategory: { isOpen: false },
    addStaff: { isOpen: false },
    addSupplier: { isOpen: false },

    updateProduct: { isOpen: false },
    updateCategory: { isOpen: false },
    updateStaff: { isOpen: false },
    updateSupplier: { isOpen: false },
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
    addCategory: IModalStateItem;
    addStaff: IModalStateItem;
    addSupplier: IModalStateItem;

    updateProduct: IModalStateItem & { productId?: string };
    updateCategory: IModalStateItem & { categoryId?: string };
    updateStaff: IModalStateItem & { staffId?: string };
    updateSupplier: IModalStateItem & { supplierId?: string };
    claim: IModalStateItem & {
        message?: ReactNode;
        onResponse?: (confirm: boolean) => any;
    };
};

export type IModalStateItem = {
    isOpen: boolean;
    refetch?: () => any;
};
