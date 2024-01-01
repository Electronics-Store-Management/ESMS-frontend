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
    const {
        isUpdateProductModalOpen,
        productId,
        closeUpdateProductModal,
    } = useUpdateProductModal();

    return (
        <Modal
            theme={{ content: { inner: " rounded-2xl" } }}
            size="3xl"
            show={isUpdateProductModalOpen}
            onClose={closeUpdateProductModal}
        >
            <UpdateProductForm productId={productId || ""} />
        </Modal>
    );
}
