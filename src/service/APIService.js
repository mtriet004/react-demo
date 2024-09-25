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

export const getDataQuiz = (quidId) => axios.get(`/api/v1/questions-by-quiz?quizId=${quidId}`)

export const postSubmitQuiz = (data) => {
    console.log({...data})
    return axios.post(`/api/v1/quiz-submit`, {...data, delay: 2000}, )
}

export const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data);
}

export const getAllQuizForAdmin = () => axios.get(`/api/v1/quiz/all`)

// export const deleteQuiz = (quizId) => axios.delete('/api/v1/quiz' + '/' + quizId)

export const deleteQuiz = (quizId) => axios.delete(`/api/v1/quiz/${quizId}`)

export const putUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
}

export const createNewQuestion = (quiz_id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}

export const createNewAnswer = (description, correct_answer, question_id) => axios.post('api/v1/answer', {description, correct_answer, question_id})

export const assignQuiz = (quizId, userId) => axios.post('/api/v1/quiz-assign-to-user', {quizId, userId})

export const getQuizWithQA = (quizId) => axios.get(`api/v1/quiz-with-qa/${quizId}`)

export const upsertQA = (data) =>{
    return axios.post(`api/v1/quiz-upsert-qa`,{...data})
}

export const logout = (email, refresh_token) => axios.post('api/v1/logout', {email, refresh_token}) 

export {createNewUser, updateUser}