import axios from 'axios';

export const client = axios.create({
  //   baseURL: 'http://localhost:4000/todos',
  baseURL: 'https://todo-practice-boom.herokuapp.com/todos',
  responseType: 'json',
  timeout: 30000,
});

export const getTodos = () => client.get('/');
export const getTodo = (todoId) => client.get(`/${todoId}`);
export const removeTodo = (todoId) => client.delete(`/${todoId}`);
export const createTodo = (todoData) => client.post('/', { todoData });
