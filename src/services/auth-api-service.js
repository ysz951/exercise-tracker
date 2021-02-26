import config from '../config';
import TokenService from './token-service';
import axios from 'axios';
const  { LUMS_API_URL } = config;
const option = {
    headers: {
        Authorization: 'Bearer ' + TokenService.getAuthToken()
    }
};
const AuthApiService = {
    
    postRefreshToken() {
        console.log("refresh")
        return axios.post(LUMS_API_URL + '/api/auth/refresh', {}, option)
          .then(res => {
            /*
              similar logic to whenever a user logs in, the only differences are:
              - we don't need to queue the idle timers again as the user is already logged in.
              - we'll catch the error here as this refresh is happening behind the scenes
            */
            
            TokenService.saveAuthToken(res.data.authToken);
            TokenService.queueCallbackBeforeExpiry(() => {
              AuthApiService.postRefreshToken()
            });
            return res;
          })
          .catch(err => {
            TokenService.clearAuthToken();
            // localStorage.removeItem('role');
            console.log('refresh token request error');
            window.location.reload(true);
            console.error(err);
          })
      },
}

export default AuthApiService;