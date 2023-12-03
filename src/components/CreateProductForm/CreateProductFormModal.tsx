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
        refetchProductList: addProduct.refetch,
        openCreateProductModal: (refetch?: () => any) =>
            setModalState({ addProduct: { isOpen: true, refetch } }),
        closeCreateProductModal: () =>
            setModalState({ addProduct: { isOpen: false } }),
    };
}

export default function CreateProductFormModal() {
    const { isCreateProductModalOpen, closeCreateProductModal } =
        useCreateProductModal();

    return (
        <Modal
            theme={{ content: { inner: " rounded-2xl" } }}
            size="3xl"
            show={isCreateProductModalOpen}
            onClose={closeCreateProductModal}
        >
            <CreateProductForm />
        </Modal>
    );
}
