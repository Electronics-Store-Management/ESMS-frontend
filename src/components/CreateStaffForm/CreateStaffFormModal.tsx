import { Modal } from "flowbite-react";
import CreateProductForm from "./CreateStaffForm";
import { useContext } from "react";
import { ModalStateContext } from "@/contexts/ModalContext";

export function useCreateStaffModal() {
    const {
        modalState: { addStaff },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        isCreateStaffModalOpen: addStaff.isOpen,
        refetchStaffList: addStaff.refetch,
        openCreateStaffModal: (refetch?: () => any) =>
            setModalState({ addStaff: { isOpen: true, refetch } }),
        closeCreateStaffModal: () =>
            setModalState({ addStaff: { isOpen: false } }),
    };
}

export default function CreateStaffFormModal() {
    const { isCreateStaffModalOpen, closeCreateStaffModal } =
        useCreateStaffModal();

    return (
        <Modal
            // theme={{
            //     root: {
            //         base: " sm:bg-background-secondary",
            //     },
            //     content: {
            //         base: "relative h-full w-full p-0 sm:p-4 md:h-auto",
            //         inner: "relative rounded-none sm:rounded-lg bg-background-secondary shadow dark:bg-gray-700 flex flex-col max-h-[90vh]",
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
            size="3xl"
            show={isCreateStaffModalOpen}
            onClose={closeCreateStaffModal}
        >
            <CreateProductForm />
        </Modal>
    );
}
