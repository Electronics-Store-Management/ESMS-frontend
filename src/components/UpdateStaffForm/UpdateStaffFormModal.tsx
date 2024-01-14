import { Modal } from "flowbite-react";
import UpdateProductForm from "./UpdateStaffForm";
import { useContext } from "react";
import { ModalStateContext } from "@/contexts/ModalContext";

export function useUpdateStaffModal() {
    const {
        modalState: { updateStaff },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        isUpdateStaffModalOpen: updateStaff.isOpen,
        staffId: updateStaff.staffId,
        refetchStaffList: updateStaff.refetch,
        openUpdateStaffModal: (staffId?: string, refetch?: () => any) =>
            setModalState({ updateStaff: { staffId, isOpen: true, refetch } }),
        closeUpdateStaffModal: () =>
            setModalState({ updateStaff: { isOpen: false } }),
    };
}

export default function UpdateStaffFormModal() {
    const { isUpdateStaffModalOpen, closeUpdateStaffModal, staffId } =
        useUpdateStaffModal();

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
            size="3xl"
            show={isUpdateStaffModalOpen}
            onClose={closeUpdateStaffModal}
        >
            <UpdateProductForm staffId={staffId} />
        </Modal>
    );
}
