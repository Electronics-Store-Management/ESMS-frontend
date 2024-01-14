import LabeledText from "@/components/Typography/LabeledText";
import API from "@/constants/apiEnpoint";
import Supplier from "@/types/entity/Supplier";
import fetchWithToken from "@/utils/fetchWithToken";
import SupplierFunction from "./supplierFunction";
import useScreen from "@/hooks/useScreen";
import TimeLineList from "./TimeLineList";

export default async function Page({ params: { id } }: PropTypes) {
    const supplierResponse = await fetchWithToken(API.supplier.getDetail(id));
    const supplier: Supplier = await supplierResponse.json();

    return (
        <>
            <div className=" flex-none xl:max-h-full h-fit pl-1 pr-8 pb-2 overflow-x-hidden xl:overflow-y-auto">
                <TimeLineList supplierId={id} />
            </div>
            <div className=" py-5 pl-5 relative w-full h-fit flex flex-col gap-5 rounded-lg border-[1px] border-secondary-300">
                <LabeledText title="Name" value={supplier.name} />
                <LabeledText title="Email" value={supplier.email} />
                <LabeledText title="Phone" value={supplier.phone} />
                <LabeledText title="Address" value={supplier.address} />
                <LabeledText title="Note" value={supplier.note} />
                <SupplierFunction id={id} />
            </div>
        </>
    );
}

type PropTypes = {
    params: { id: string };
};
