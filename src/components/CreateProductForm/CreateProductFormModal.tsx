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
            // theme={{
            //     content: {
            //         base: "relative h-full w-full p-0 sm:p-4 md:h-auto",
            //         inner: "relative rounded-none sm:rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]",
            //     },
            // }}
            theme={{
                root: {
                    base: " sm:bg-background-secondary",
                },
                content: {
                    base: "relative h-full w-full p-0 sm:p-4 md:h-auto",
                    inner: "relative rounded-none sm:rounded-lg bg-background-secondary shadow dark:bg-gray-700 flex flex-col max-h-[90vh]",
                },
            }}
            size="5xl"
            show={isCreateProductModalOpen}
            onClose={closeCreateProductModal}
        >
            <CreateProductForm />
        </Modal>
    );
}
