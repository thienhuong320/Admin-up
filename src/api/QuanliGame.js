import axiosAdmin from "./axiosAdmin";

const QuanlyGameApi = {
    getAllGames(){
        const url = "/games/";
        return axiosAdmin.get(url);
    },

    getGameById(id){
        const url = `/games/${id}`;
        return axiosAdmin.get(url);
    },

    createGame(gameData) {
        const url = "/games/create";
        
        axiosAdmin.post(url, gameData).then(response => {
            console.log("Response:", response.data);
        })
        .catch(error => {
            console.error("Error:", error);
        });;
    },
    

    updateGame(id){
        const url = `/games/update/${id}`;
        return axiosAdmin.put(url);
    },
    deleteGame(id) {
        const url = `/games/delete/${id}`;
        return axiosAdmin.delete(url);
    },
    
    getGameByTag(tag) {
        const url = `/games/tag/${tag}`;
        return axiosAdmin.get(url);
    }

}
export default QuanlyGameApi;