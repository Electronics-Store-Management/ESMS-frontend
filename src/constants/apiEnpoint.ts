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
    permission: {
        getStaffPermission: (staffId: string) =>
            `${BASE_API}/staff/${staffId}/permission`,
    },
    supplier: {
        getDetail: (id: string) => `${BASE_API}/supplier/${id}`,
        getHistory: (id: string) => `${BASE_API}/supplier/history/${id}`,
    },
    importBill: {
        getDetail: (id: string) => `${BASE_API}/import/${id}`,
    },
    saleBill: {
        getDetail: (id: string) => `${BASE_API}/sale/${id}`,
    },
    warrantyBill: {
        getDetail: (id: string) => `${BASE_API}/warranty/${id}`,
    },
};

export default API;
