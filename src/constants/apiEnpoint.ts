const BASE_API = "http://localhost:8080";

const API = {
	baseUrl: BASE_API,
	authentication: {
		signIn: `${BASE_API}/auth/authenticate`,
	},
};

export default API;
