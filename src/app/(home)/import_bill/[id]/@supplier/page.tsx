import Avatar from "@/components/Avatar/Avatar";
import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import ImportBill, { ImportProductResponse } from "@/types/entity/ImportBill";
import Supplier from "@/types/entity/Supplier";
import fetchWithToken from "@/utils/fetchWithToken";

export default async function Page({ params: { id } }: PropTypes) {
    const importBillResponse = await fetchWithToken(
        API.importBill.getDetail(id),
    );

    const importBillHistory = await importBillResponse.json();
    const importBill: Revision<ImportBill<ImportProductResponse>> =
        importBillHistory?.[0];

    if (importBill.revision.supplierId) {
        const supplierResponse = await fetchWithToken(
            API.supplier.getDetail(importBill.revision.supplierId),
        );

        const supplier: Supplier = await supplierResponse.json();

        return (
            <Avatar
                className="p-3 -mx-3 flex justify-start items-start rounded-lg hover:bg-background-hover cursor-pointer "
                rounded
                
                placeholderInitials={supplier.name
                    .split(" ")
                    .slice(-2)
                    .map((word) => word[0])
                    .join("")}
            >
                <div>
                    <p className=" font-semibold text-start text-secondary-950 text-sm">
                        {supplier.name}
                    </p>
                    <p className=" font-normal text-start text-secondary-600 text-sm">
                        {supplier.email}
                    </p>
                    <p className=" font-normal text-start text-secondary-600 text-sm">
                        {supplier.phone}
                    </p>
                    <p className=" font-normal text-start text-secondary-600 text-sm">
                        {supplier.address}
                    </p>
                </div>
            </Avatar>
        );
    }
    return null;
}

type PropTypes = {
    params: { id: string };
};
