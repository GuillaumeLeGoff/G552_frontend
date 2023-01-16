import axios from "axios";
import Config from "../config.json";

const URL_API = Config.SERVER_URL;

class AuthService {
    
     login(username, password) {
         return axios.post(URL_API + "/auth/signin", {
                username,
                password
            }).then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
               return response.data;
            });
    }
    
    logout() {
        localStorage.removeItem("user");
    }
    register(username, password, role) {
         let roles = [];
         roles[0] = role;
        return axios.post(URL_API + "/auth/signup", {
            username,
            password,
            roles
        });
    }

    updateUser(_id, role){
        let roles = [];
        console.log(_id)
        roles[0] = role;
        return axios.put(URL_API + "/user/" + _id, {
            roles
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();