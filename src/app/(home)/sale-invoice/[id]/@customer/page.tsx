import Avatar from "@/components/Avatar/Avatar";
import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import Customer from "@/types/entity/Customer";
import SaleBill, {
    SaleBillResponse,
    SaleProductResponse,
} from "@/types/entity/SaleBill";
import fetchWithToken from "@/utils/fetchWithToken";

export default async function Page({ params: { id } }: PropTypes) {
    const saleBillResponse = await fetchWithToken(API.saleBill.getDetail(id));

    if (saleBillResponse.status != 200) {
        throw "error";
    }

    const saleBillHistory: Revision<SaleBillResponse<SaleProductResponse>>[] =
        await saleBillResponse.json();

    const saleBill = saleBillHistory?.[0];

    if (saleBill.revision.customer) {
        const customer = saleBill.revision.customer;

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
