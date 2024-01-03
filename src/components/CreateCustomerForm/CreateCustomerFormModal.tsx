import { ModalStateContext } from "@/contexts/ModalContext";
import { Modal } from "flowbite-react";
import { useContext } from "react";
import CreateSupplierForm from "../CreateSupplierForm/CreateSupplierForm";
import CreateCustomerForm from "./CreateCustomerForm";

export function useCreateCustomerModal() {
    const {
        modalState: { addCustomer },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        ...addCustomer,
        open: (refetch?: () => any) =>
            setModalState({ addCustomer: { isOpen: true, refetch } }),
        close: () => setModalState({ addCustomer: { isOpen: false } }),
    };
}

export default function CreateCustomerFormModal() {
    const { isOpen, close } = useCreateCustomerModal();

    return (
        <Modal
            theme={{ content: { inner: " rounded-2xl" } }}
            size="xl"
            show={isOpen}
            onClose={close}
        >
            <CreateCustomerForm />
        </Modal>
    );
}
