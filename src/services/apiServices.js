import axios from "../utils/axiosCustomize";

const postCreateNewUsers = (email, password, username, role, image) => {
  //submit data
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);
  return axios.post('api/v1/participant', data);
}

const getAllUsers = () => {
  return axios.get('api/v1/participant/all');
}
const putUpdateUsers = (id, username, role, image) => {
  //submit data
  const data = new FormData();
  data.append('id', id);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);
  return axios.put('api/v1/participant', data);
}
const deleteUsers = (userId) => {
  return axios.delete('api/v1/participant', { data: { id: userId } });
}
const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (userEmail, userPassword, delay) => {
  return axios.post("/api/v1/login", {
    email: userEmail,
    password: userPassword,
    delay: 2000
  }
  );
}
const postRegister = (userEmail, name, userPassword) => {
  return axios.post("/api/v1/register", { email: userEmail, username: name, password: userPassword });
}

const getQuizByUser = () => {
  return axios.get("/api/v1/quiz-by-participant")
}
const getDataQuiz = (id) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`)
}
const postSubmitQuiz = (data) => {
  console.log({ ...data })
  return axios.post(`/api/v1/quiz-submit`, { ...data });
}
const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append('description', description);
  data.append('name', name);
  data.append('difficulty', difficulty);
  data.append('quizImage', image);
  return axios.post('api/v1/quiz', data);
}
const getAllQuizForAdmin = () => {
  return axios.get(`/api/v1/quiz/all`)
}
export { postCreateNewUsers, getAllUsers, putUpdateUsers, deleteUsers, getUserWithPaginate, postLogin, postRegister, getQuizByUser, getDataQuiz, postSubmitQuiz, postCreateNewQuiz, getAllQuizForAdmin };