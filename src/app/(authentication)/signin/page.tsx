import withQuery from "@/utils/withQuery";
import SignIn from "./SignIn";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import API from "@/constants/apiEnpoint";

export default async function Page() {
    const myHeaders = new Headers();
    const accessToken = cookies().get("accessToken")?.value || "";
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const staffInfoResponse = await fetch(API.staff.getStaffProfile, {
        headers: myHeaders,
    });

    if (staffInfoResponse.status === 200) redirect(withQuery("/home", {}));

    return <SignIn />;
}
