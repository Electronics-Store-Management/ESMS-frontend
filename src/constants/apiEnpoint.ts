const BASE_API = "http://localhost:8080";
// const BASE_API = "https://esms.hoanghy.space";

const API = {
    baseUrl: BASE_API,
    authentication: {
        signIn: `${BASE_API}/auth/authenticate`,
    },
    staff: {
        getStaffProfile: `${BASE_API}/staff/profile`,
        getDetailByUsername: (email: string) =>
            `${BASE_API}/staff/username?email=${email}`,
    },
    supplier: {
        getDetail: (id: string) => `${BASE_API}/supplier/${id}`,
    },
    importBill: {
        getDetail: (id: string) => `${BASE_API}/import/${id}`,
    },
};

export default API;
