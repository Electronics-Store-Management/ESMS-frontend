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
            <UpdateSupplierForm />
        </Modal>
    );
}
