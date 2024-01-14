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
            // theme={{ content: { inner: " rounded-2xl" } }}
            theme={{
                root: {
                    base: " sm:bg-background-secondary",
                },
                content: {
                    base: "relative h-full w-full p-0 sm:p-4 md:h-auto",
                    inner: "relative rounded-none sm:rounded-lg bg-background-secondary shadow dark:bg-gray-700 flex flex-col max-h-[90vh]",
                },
            }}
            size="lg"
            show={isCreateCategoryModalOpen}
            onClose={closeCreateCategoryModal}
        >
            <CreateCategoryForm />
        </Modal>
    );
}
