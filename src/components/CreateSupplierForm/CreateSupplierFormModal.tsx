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
            show={isOpen}
            onClose={close}
        >
            <CreateProductForm />
        </Modal>
    );
}
