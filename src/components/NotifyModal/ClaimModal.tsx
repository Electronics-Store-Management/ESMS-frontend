import { ReactNode } from "react";
import NotifyModal from "./NotifyModal";

export default function ClaimModal({ itemName, ...props }: PropTypes) {
    return (
        <NotifyModal
            {...props}
            icon={null}
            message={
                <>
                    <h2 className=" mb-6 text-2xl font-semibold text-secondary-950">
                        Confirm delete?
                    </h2>
                    <p className=" mb-6 text-sm font-medium text-secondary-950">
                        Do you really want to delete {itemName || ""}?
                    </p>
                </>
            }
        />
    );
}

type PropTypes = {
    openModal?: boolean;
    setOpenModal?: (v: boolean) => any;
    onResponse?: (v: boolean) => any;
    itemName?: ReactNode;
};
