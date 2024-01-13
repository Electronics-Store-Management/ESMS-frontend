import { ModalStateContext } from "@/contexts/ModalContext";
import { Modal } from "flowbite-react";
import { useContext } from "react";
import CreateProductForm from "./CreateSupplierForm";

export function useCreateSupplierModal() {
    const {
        modalState: { addSupplier },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        ...addSupplier,
        open: (refetch?: () => any) =>
            setModalState({ addSupplier: { isOpen: true, refetch } }),
        close: () => setModalState({ addSupplier: { isOpen: false } }),
    };
}

export default function CreateSupplierFormModal() {
    const { isOpen, close } = useCreateSupplierModal();

    return (
        <Modal
            theme={{ content: { inner: " rounded-2xl" } }}
            size="3xl"
            show={isOpen}
            onClose={close}
        >
            <CreateProductForm />
        </Modal>
    );
}
