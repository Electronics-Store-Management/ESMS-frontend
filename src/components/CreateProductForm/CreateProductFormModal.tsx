import { Modal } from "flowbite-react";
import CreateProductForm from "./CreateProductForm";
import { useContext } from "react";
import { ModalStateContext } from "@/contexts/ModalContext";

export function useCreateProductModal() {
    const {
        modalState: { addProduct },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        isCreateProductModalOpen: addProduct.isOpen,
        openCreateProductModal: () =>
            setModalState((prev) => ({
                ...prev,
                addProduct: { isOpen: true },
            })),
        closeCreateProductModal: () =>
            setModalState((prev) => ({
                ...prev,
                addProduct: { isOpen: false },
            })),
    };
}

export default function CreateProductFormModal() {
    const {
        modalState: { addProduct },
        setModalState,
    } = useContext(ModalStateContext);

    return (
        <Modal
            theme={{
                content: {
                    inner: " rounded-2xl",
                },
            }}
            size="3xl"
            show={addProduct.isOpen}
            onClose={() =>
                setModalState((prev) => ({
                    ...prev,
                    addProduct: { isOpen: false },
                }))
            }
        >
            <CreateProductForm />
        </Modal>
    );
}
