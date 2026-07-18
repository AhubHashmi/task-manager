import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = () => axios.get(API_URL);

export const createTask = (taskData) => axios.post(API_URL, taskData);

export const updateTask = (id, taskData) =>
  axios.put(`${API_URL}/${id}`, taskData);

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);