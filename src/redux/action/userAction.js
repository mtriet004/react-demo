export const FETCH_USER_LOGIN_SUCCESS = 'Fetch_User_Login_Success'

export const doLogin = (data) =>{
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload:data
    }
}