import Avatar from "@/components/Avatar/Avatar";
import API from "@/constants/apiEnpoint";
import Staff from "@/types/entity/Staff";
import fetchWithToken from "@/utils/fetchWithToken";

export default async function StaffAvatar({
    username,
    className,
    ...props
}: {
    username: string;
} & React.ComponentPropsWithoutRef<"div">) {
    const staffResponse = await fetchWithToken(
        API.staff.getDetailByUsername(username),
    );

    const staff: Staff = await staffResponse.json();

    return (
        <Avatar
            className={`p-3 -mx-3 flex w-fit justify-start rounded-lg hover:bg-background-hover cursor-pointer ${className}`}
            {...props}
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
