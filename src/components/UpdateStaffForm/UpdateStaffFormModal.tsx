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
            theme={{ content: { inner: " rounded-2xl" } }}
            size="3xl"
            show={isUpdateStaffModalOpen}
            onClose={closeUpdateStaffModal}
        >
            <UpdateProductForm staffId={staffId} />
        </Modal>
    );
}
