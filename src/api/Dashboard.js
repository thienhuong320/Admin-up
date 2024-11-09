import axiosAdmin from "./axiosAdmin";

const DashboardApi = {
    getAllUser(){
        const url = "/users/";
        return axiosAdmin.get(url);
    },

    getAllGames(){
        const url = "/games/";
        return axiosAdmin.get(url);
    },


}
export default DashboardApi;