import axios from 'axios';
import config from '../config';
import TokenService from "../services/token-service";

const  { LUMS_API_URL } = config;
const option = {
    headers: {
        Authorization: 'Bearer ' + TokenService.getAuthToken()
    }
};
class MemberRESTService {

    createMember(member) {
        return axios.post(LUMS_API_URL + '/users/add', member);
    }

    memberLogin(member) {
        return axios.post(LUMS_API_URL + '/api/auth/login', member);
    }

}


export default new MemberRESTService();