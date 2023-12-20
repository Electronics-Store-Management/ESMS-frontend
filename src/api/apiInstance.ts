import API from "@/constants/apiEnpoint";
import axios from "axios";

import { ILoginResponse } from "./types";
import IToken from "@/types/Token";
import SEARCH_PARAMS from "@/constants/searchParams";
import { getCookie, setCookie } from "cookies-next";

const apiInstance = axios.create({
    baseURL: API.baseUrl,
});

apiInstance.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessTokenFn = async () => {
    const refreshToken = getCookie("refreshToken");
    if (refreshToken) {
        try {
            const response = await apiInstance.post<ILoginResponse>(
                `auth/refresh-token`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                    baseURL: API.baseUrl,
                },
            );
            const tokenRes = response.data;
            // getCookie("accessToken")
            // localStorage.setItem(
            //     "token",
            //     JSON.stringify({
            //         accessToken: tokenRes.access_token,
            //         refreshToken: tokenRes.refresh_token,
            //     } as IToken),
            // );
            setCookie("accessToken", tokenRes.access_token);
            setCookie("refreshToken", tokenRes.refresh_token);
        } catch (error) {
            localStorage.setItem("token", "{}");
            window.location.replace(
                `/signin?${SEARCH_PARAMS.redirectUri}=${window.location.href}`,
            );
        }
    }
};

const authenticationInterceptor = apiInstance.interceptors.request.use(
    (request) => {
        // const tokenStr = localStorage.getItem("token") || "";
        const accessToken = getCookie("accessToken");
        if (accessToken && !request.headers.getAuthorization()) {
            // const token = JSON.parse(tokenStr) as IToken;
            request.headers.setAuthorization(`Bearer ${accessToken}`);
            request.withCredentials = true;
        }
        return request;
    },
);

apiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.code == "ERR_NETWORK") return Promise.reject(error);
        const errMessage = error.response.data.errors as string[];
        if (errMessage.includes("Expired JWT") && !originalRequest._retry) {
            originalRequest._retry = true;
            if (!originalRequest?.isRefresh) await refreshAccessTokenFn();
            originalRequest.isRefresh = true;
            return apiInstance(originalRequest);
        }
        return Promise.reject(error);
    },
);

export default apiInstance;
