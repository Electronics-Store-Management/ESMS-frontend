import Avatar from "@/components/Avatar/Avatar";
import TextInput from "@/components/Input/TextInput";
import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import ImportBill, { ImportProductResponse } from "@/types/entity/ImportBill";
import Staff from "@/types/entity/Staff";
import fetchWithToken from "@/utils/fetchWithToken";
import FORMATTER from "@/utils/formatter";

export default async function Page({ params: { id } }: PropTypes) {
    const importBillResponse = await fetchWithToken(
        API.importBill.getDetail(id),
    );

    const importBillHistory = await importBillResponse.json();
    const importBill: Revision<ImportBill<ImportProductResponse>> =
        importBillHistory?.[0];

    const staffResponse = await fetchWithToken(
        API.staff.getDetailByUsername(importBill.username),
    );

    const staff: Staff = await staffResponse.json();

    return (
        <Avatar
            className="p-3 flex justify-start rounded-lg hover:bg-background-hover cursor-pointer "
            rounded
            placeholderInitials={staff.name
                .split(" ")
                .slice(-2)
                .map((word) => word[0])
                .join("")}
        >
            <div>
                <p className=" font-semibold text-start text-secondary-950 text-sm">
                    {staff.name}
                </p>
                <p className=" font-normal text-start text-secondary-600 text-sm">
                    {staff.email}
                </p>
            </div>
        </Avatar>
    );
}

type PropTypes = {
    params: { id: string };
};
