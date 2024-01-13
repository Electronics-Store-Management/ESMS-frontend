import { ModalStateContext } from "@/contexts/ModalContext";
import { Modal } from "flowbite-react";
import { useContext } from "react";
import CreateProductForm from "./UpdateSupplierForm";
import UpdateSupplierForm from "./UpdateSupplierForm";

export function useUpdateSupplierModal() {
    const {
        modalState: { updateSupplier },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        ...updateSupplier,
        open: (supplierId: string, refetch?: () => any) =>
            setModalState({
                updateSupplier: { isOpen: true, refetch, supplierId },
            }),
        close: () => setModalState({ updateSupplier: { isOpen: false } }),
    };
}

export default function UpdateSupplierFormModal() {
    const { isOpen, close } = useUpdateSupplierModal();

    return (
        <Modal
            theme={{ content: { inner: " rounded-2xl" } }}
            size="3xl"
            show={isOpen}
            onClose={close}
        >
            <UpdateSupplierForm />
        </Modal>
    );
}
