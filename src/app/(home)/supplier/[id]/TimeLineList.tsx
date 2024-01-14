import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import Supplier from "@/types/entity/Supplier";
import fetchWithToken from "@/utils/fetchWithToken";
import FORMATTER from "@/utils/formatter";

import StaffAvatar from "@/components/StaffAvatar/StaffAvatar";
import {
    Timeline,
    TimelineBody,
    TimelineContent,
    TimelineItem,
    TimelinePoint,
    TimelineTime,
    TimelineTitle,
} from "flowbite-react";
import Link from "next/link";

export default async function TimeLineList({
    supplierId,
}: {
    supplierId: string;
}) {
    const historyResponse = await fetchWithToken(
        API.supplier.getHistory(supplierId),
    );
    const history: Revision<Supplier>[] = await historyResponse.json();

    return (
        <Timeline>
            {history.map(({ id, timestamp, username }) => (
                <TimelineItem key={id}>
                    <TimelinePoint />
                    <TimelineContent>
                        <TimelineTime>
                            <Link href={`/supplier/${supplierId}/${id}`}>
                                {FORMATTER.toShortDate(timestamp)}
                            </Link>
                        </TimelineTime>
                        <TimelineTitle>{}</TimelineTitle>
                        <TimelineBody>
                            <p className=" mt-3 font-semibold text-sm">
                                Edited by
                            </p>
                            <StaffAvatar username={username} />
                        </TimelineBody>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
}
