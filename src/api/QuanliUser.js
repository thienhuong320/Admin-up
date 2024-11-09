import axiosAdmin from "./axiosAdmin";

const QuanlyUserApi = {
    getAllUser(){
        const url = "/users/";
        return axiosAdmin.get(url);
    },
    getUserById(id){
        const url = `/users/${id}`;
        return axiosAdmin.get(url);
    },
    createUser(userData) {
        const url = "/users/create";
        return axiosAdmin.post(url, userData); // Chuyển gameData từ frontend vào backend
    },
    updateUser(id){
        const url = `/users/update/${id}`;
        return axiosAdmin.put(url);
    },
    deleteUser(id) {
        const url = `/users/delete/${id}`;
        return axiosAdmin.delete(url);
    },

}
export default QuanlyUserApi;