import withQuery from "@/utils/withQuery";
import SignIn from "./SignIn";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
    const accessToken = cookies().get("accessToken")?.value || "";

    if (accessToken) redirect(withQuery("/home", {}));

    return <SignIn />;
}
