import Button from "@/components/Button/Button";
import StaffAvatar from "@/components/StaffAvatar/StaffAvatar";
import LabeledText from "@/components/Typography/LabeledText";
import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import Supplier from "@/types/entity/Supplier";
import fetchWithToken from "@/utils/fetchWithToken";
import FORMATTER from "@/utils/formatter";

export default async function Page({ params: { id, revisionId } }: PropTypes) {
    const historyResponse = await fetchWithToken(API.supplier.getHistory(id));
    const history: Revision<Supplier>[] = await historyResponse.json();

    const revision = history.find(({ id }) => id == revisionId);
    const supplier = revision?.revision;

    return (
        <div className=" w-full flex-1 overflow-auto flex flex-col gap-5 rounded-lg border-[1px] border-secondary-200  py-5 pl-8">
            <div className=" flex flex-col items-start gap-1">
                <p className=" text-sm text-secondary-600">
                    Version id:{" "}
                    <span className=" font-semibold">{revision?.id}</span>
                </p>
                <p className=" text-sm text-secondary-600">
                    Updated at:{" "}
                    <span className=" font-semibold">
                        {FORMATTER.toShortDate(revision?.timestamp)}
                    </span>
                </p>
                <StaffAvatar username={revision?.username || ""} />
            </div>
            <hr />
            <div className=" grid gap-3">
                <LabeledText title="Name" value={supplier?.name} />
                <LabeledText title="Email" value={supplier?.email} />
                <LabeledText title="Phone" value={supplier?.phone} />
                <LabeledText title="Address" value={supplier?.address} />
                <LabeledText title="Note" value={supplier?.note} />
            </div>
        </div>
    );
}

type PropTypes = {
    params: { id: string; revisionId: string };
};
