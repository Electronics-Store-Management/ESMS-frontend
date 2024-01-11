import COOKIE_NAME from "@/constants/cookies";
import { NextResponse } from "next/server";

export function middleware(request: Request) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(COOKIE_NAME.XURL, request.url);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}
