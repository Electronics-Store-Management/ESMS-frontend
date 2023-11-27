"use client";

import CreateProductForm from "@/components/CreateProductForm/CreateProductForm";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { Modal } from "flowbite-react";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

export function ModalProvider({ children }: ReactNodeChildren) {
    const [modalState, setModalState] = useState<IModalState>({
        addProduct: { isOpen: false },
    });

    return (
        <ModalStateContext.Provider value={{ modalState, setModalState }}>
            {children}
            <Modal
                className=" rounded-2xl"
                show={modalState.addProduct.isOpen}
                onClose={() =>
                    setModalState((prev) => ({
                        ...prev,
                        addProduct: { isOpen: false },
                    }))
                }
            >
                <CreateProductForm />
            </Modal>
        </ModalStateContext.Provider>
    );
}

export function useModalState() {
    const { modalState, setModalState } = useContext(ModalStateContext);

    return {
        addProductModal: {
            isOpen: modalState.addProduct.isOpen,
            open: () =>
                setModalState((prev) => ({
                    ...prev,
                    addProduct: { isOpen: true },
                })),
            close: () =>
                setModalState((prev) => ({
                    ...prev,
                    addProduct: { isOpen: false },
                })),
        },
    };
}

export const ModalStateContext = createContext<IModalStateContext>({
    modalState: {
        addProduct: {
            isOpen: false,
        },
    },
    setModalState: () => {},
});

export type IModalStateContext = {
    modalState: IModalState;
    setModalState: Dispatch<SetStateAction<IModalState>>;
};

export type IModalState = {
    addProduct: IModalStateItem;
};

export type IModalStateItem = {
    isOpen: boolean;
};
