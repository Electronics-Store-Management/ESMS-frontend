import { ModalStateContext } from "@/contexts/ModalContext";
import { Modal } from "flowbite-react";
import { useContext } from "react";
import CreateCategoryForm from "./CreateCategoryForm";

export function useCreateCategoryModal() {
    const {
        modalState: { addCategory },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        isCreateCategoryModalOpen: addCategory.isOpen,
        refetchCategoryList: addCategory.refetch,
        openCreateCategoryModal: (refetch?: () => any) =>
            setModalState({ addCategory: { isOpen: true, refetch } }),
        closeCreateCategoryModal: () =>
            setModalState({ addCategory: { isOpen: false } }),
    };
}

export default function CreateCategoryFormModal() {
    const { isCreateCategoryModalOpen, closeCreateCategoryModal } =
        useCreateCategoryModal();

    return (
        <Modal
            theme={{ content: { inner: " rounded-2xl" } }}
            size="3xl"
            show={isCreateCategoryModalOpen}
            onClose={closeCreateCategoryModal}
        >
            <CreateCategoryForm />
        </Modal>
    );
}

