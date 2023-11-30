"use client";

import CreateProductFormModal from "@/components/CreateProductForm/CreateProductFormModal";
import UpdateProductFormModal from "@/components/UpdateProductForm/UpdateProductFormModal";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import Product from "@/types/entity/Product";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export function ModalProvider({ children }: ReactNodeChildren) {
    const [modalState, setModalState] = useState<IModalState>({
        addProduct: { isOpen: false },
        updateProduct: { isOpen: false },
        deleteProduct: { isOpen: false },
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
        </ModalStateContext.Provider>
    );
}

export const ModalStateContext = createContext<IModalStateContext>({
    modalState: {
        addProduct: { isOpen: false },
        updateProduct: { isOpen: false },
        deleteProduct: { isOpen: false },
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
    deleteProduct: IModalStateItem;
};

export type IModalStateItem = {
    isOpen: boolean;
    refetch?: () => any;
};
