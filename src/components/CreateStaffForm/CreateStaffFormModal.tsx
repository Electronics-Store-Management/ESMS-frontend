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
            theme={{
                content: { inner: " rounded-2xl bg-background-secondary" },
                root: { show: { on: "flex bg-secondary-500 bg-opacity-50" } },
            }}
            size="3xl"
            show={isCreateStaffModalOpen}
            onClose={closeCreateStaffModal}
        >
            <CreateProductForm />
        </Modal>
    );
}
