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
            show={isUpdateCategoryModalOpen}
            onClose={closeUpdateCategoryModal}
        >
            <UpdateCategoryForm categoryId={categoryId || ""} />
        </Modal>
    );
}

