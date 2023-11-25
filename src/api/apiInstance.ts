import API from "@/constants/apiEnpoint";
import axios from "axios";

import { ILoginResponse } from "./types";
import IToken from "@/types/Token";

const apiInstance = axios.create({
	baseURL: API.baseUrl,
});

apiInstance.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessTokenFn = async () => {
	const tokenStr = localStorage.getItem("token") || "";
	if (tokenStr) {
		const token = JSON.parse(tokenStr) as IToken;
		const response = await apiInstance.get<ILoginResponse>("auth/refresh", {
			headers: {
				Authorization: `Bearer ${token.refreshToken}`,
			},
		});
		const tokenRes = response.data;
		localStorage.setItem(
			"token",
			JSON.stringify({
				accessToken: tokenRes.access_token,
				refreshToken: tokenRes.refresh_token,
			} as IToken)
		);
	}
};

apiInstance.interceptors.request.use((request) => {
	const tokenStr = localStorage.getItem("token") || "";
	if (tokenStr) {
		const token = JSON.parse(tokenStr) as IToken;
		request.headers.setAuthorization(`Bearer ${token.accessToken}`);
	}
	return request;
});

apiInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		const errMessage = error.response.data.errors as string;
		if (errMessage.includes("Expired JWT") && !originalRequest._retry) {
			originalRequest._retry = true;
			if (!originalRequest?.isRefresh) await refreshAccessTokenFn();
			originalRequest.isRefresh = true;
			return apiInstance(originalRequest);
		}
		return Promise.reject(error);
	}
);

export default apiInstance;
