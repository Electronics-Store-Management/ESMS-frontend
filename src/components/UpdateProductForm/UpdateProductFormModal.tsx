import { ModalStateContext } from "@/contexts/ModalContext";
import { Modal } from "flowbite-react";
import { useContext } from "react";
import UpdateProductForm from "./UpdateProductForm";

export function useUpdateProductModal() {
    const {
        modalState: { updateProduct },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        isUpdateProductModalOpen: updateProduct.isOpen,
        productId: updateProduct.productId,
        refetchProductList: updateProduct.refetch,
        openUpdateProductModal: (productId?: string, refetch?: () => any) =>
            setModalState({
                updateProduct: { isOpen: true, productId, refetch },
            }),
        closeUpdateProductModal: () =>
            setModalState({ updateProduct: { isOpen: false } }),
    };
}

export default function UpdateProductFormModal() {
    const { isUpdateProductModalOpen, productId, closeUpdateProductModal } =
        useUpdateProductModal();

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
            size="4xl"
            show={isUpdateProductModalOpen}
            onClose={closeUpdateProductModal}
        >
            <UpdateProductForm productId={productId || ""} />
        </Modal>
    );
}
