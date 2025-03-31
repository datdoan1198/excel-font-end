import {apiAxios} from "@/api/rootApi.js";

export const changeExcel = (data = {}) => {
    return apiAxios({
        method: "post",
        url: "/excel",
        data,
        responseType: 'blob'
    });
};
