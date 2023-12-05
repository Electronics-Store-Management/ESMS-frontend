import { ModalStateContext } from "@/contexts/ModalContext";
import { Modal } from "flowbite-react";
import { useContext } from "react";
import UpdateCategoryForm from "./UpdateCategoryForm";

export function useUpdateCategoryModal() {
    const {
        modalState: { updateCategory },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        isUpdateCategoryModalOpen: updateCategory.isOpen,
        categoryId: updateCategory.categoryId,
        refetchCategoryList: updateCategory.refetch,
        openUpdateCategoryModal: (categoryId?: string, refetch?: () => any) =>
            setModalState({
                updateCategory: { isOpen: true, categoryId, refetch },
            }),
        closeUpdateCategoryModal: () =>
            setModalState({ updateCategory: { isOpen: false } }),
    };
}

export default function UpdateCategoryFormModal() {
    const { isUpdateCategoryModalOpen, categoryId, closeUpdateCategoryModal } =
        useUpdateCategoryModal();

    return (
        <Modal
            theme={{ content: { inner: " rounded-2xl" } }}
            size="3xl"
            show={isUpdateCategoryModalOpen}
            onClose={closeUpdateCategoryModal}
        >
            <UpdateCategoryForm categoryId={categoryId || ""} />
        </Modal>
    );
}

