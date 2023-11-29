"use client";

import CreateProductFormModal from "@/components/CreateProductForm/CreateProductFormModal";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export function ModalProvider({ children }: ReactNodeChildren) {
    const [modalState, setModalState] = useState<IModalState>({
        addProduct: { isOpen: false },
        deleteProduct: { isOpen: false },
    });

    return (
        <ModalStateContext.Provider value={{ modalState, setModalState }}>
            {children}
            <CreateProductFormModal />
        </ModalStateContext.Provider>
    );
}

export const ModalStateContext = createContext<IModalStateContext>({
    modalState: {
        addProduct: { isOpen: false },
        deleteProduct: { isOpen: false },
    },
    setModalState: () => {},
});

export type IModalStateContext = {
    modalState: IModalState;
    setModalState: Dispatch<SetStateAction<IModalState>>;
};

export type IModalState = {
    addProduct: IModalStateItem;
    deleteProduct: IModalStateItem;
};

export type IModalStateItem = {
    isOpen: boolean;
};
