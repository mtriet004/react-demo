import axios from '../utils/axiosCustomize';

const createNewUser = (email, password, username, role, image) =>{
    //submit  
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}

const updateUser = (id, username, role, image) =>{
    //submit  
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}

export const getAllUser = () => axios.get('/api/v1/participant/all')

export const deleteUser = (userId) => axios.delete('/api/v1/participant',{ data: {id: userId} })

export const getUserWithPaginate = (page, limit) => axios.get(`/api/v1/participant?page=${page}&limit=${limit}`)

export const login = (email, password) => axios.post('/api/v1/login', {email, password, delay: 2000})

export const signup = (email, password, username) => axios.post('/api/v1/register', {email, password, username})

export const getQuizByUser = () => axios.get('/api/v1/quiz-by-participant')

export {createNewUser, updateUser}