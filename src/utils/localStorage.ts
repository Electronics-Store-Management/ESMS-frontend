import IToken from "@/types/Token";

export default function getAccessToken() {
    const token: IToken = JSON.parse(localStorage.getItem("token") || "{}");
    return token?.accessToken || "";
}
