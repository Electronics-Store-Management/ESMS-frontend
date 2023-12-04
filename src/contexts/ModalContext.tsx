"use client";

import ClaimModal from "@/components/ClaimModal/ClaimModal";
import CreateCategoryFormModal from "@/components/CreateCategoryForm/CreateCategoryFormModal";
import CreateProductFormModal from "@/components/CreateProductForm/CreateProductFormModal";
import UpdateProductFormModal from "@/components/UpdateProductForm/UpdateProductFormModal";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import ProductPreview from "@/types/entity/ProductPreview";
import { ReactNode, createContext, useState } from "react";

export function ModalProvider({ children }: ReactNodeChildren) {
    const [modalState, setModalState] = useState<IModalState>({
        addProduct: { isOpen: false },
        updateProduct: { isOpen: false },
        addCategory: { isOpen: false },
        claim: { isOpen: false },
    });

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
            <ClaimModal />
        </ModalStateContext.Provider>
    );
}

export const ModalStateContext = createContext<IModalStateContext>({
    modalState: {
        addProduct: { isOpen: false },
        updateProduct: { isOpen: false },
        addCategory: { isOpen: false },
        claim: { isOpen: false },
    },
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
    updateProduct: IModalStateItem & { productId?: string };
    addCategory: IModalStateItem;
    claim: IModalStateItem & {
        message?: ReactNode;
        onResponse?: (confirm: boolean) => any;
    };
};

export type IModalStateItem = {
    isOpen: boolean;
    refetch?: () => any;
};

