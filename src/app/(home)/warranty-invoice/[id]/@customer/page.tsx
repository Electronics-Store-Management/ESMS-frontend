import Avatar from "@/components/Avatar/Avatar";
import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import {
    WarrantyBillResponse,
    WarrantyProductResponse,
} from "@/types/entity/WarrantyBill";
import fetchWithToken from "@/utils/fetchWithToken";

export default async function Page({ params: { id } }: PropTypes) {
    const warrantyBillResponse = await fetchWithToken(
        API.warrantyBill.getDetail(id),
    );

    if (warrantyBillResponse.status != 200) {
        throw "error";
    }

    const warrantyBillHistory: Revision<
        WarrantyBillResponse<WarrantyProductResponse>
    >[] = await warrantyBillResponse.json();

    const warrantyBill = warrantyBillHistory?.[0];
    console.log({ warrantyBill });

    if (warrantyBill.revision.customer) {
        const customer = warrantyBill.revision.customer;

        return (
            <Avatar
                className="p-3 -mx-3 w-fit flex justify-start items-start rounded-lg hover:bg-background-hover cursor-pointer "
                rounded
                placeholderInitials={customer.name
                    .split(" ")
                    .slice(-2)
                    .map((word) => word[0])
                    .join("")}
            >
                <div>
                    <p className=" font-semibold text-start text-secondary-950 text-sm">
                        {customer.name}
                    </p>
                    <p className=" font-normal text-start text-secondary-600 text-sm">
                        {customer.phone}
                    </p>
                    <p className=" font-normal text-start text-secondary-600 text-sm">
                        {customer.address}
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
