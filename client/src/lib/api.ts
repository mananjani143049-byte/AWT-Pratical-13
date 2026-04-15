import axios from 'axios';

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

export const getProjects = () => API.get('/projects').then(r => r.data);
export const getSkills = () => API.get('/skills').then(r => r.data);
export const sendMessage = (data: object) => API.post('/messages', data).then(r => r.data);
export const login = (email: string, password: string) => API.post('/auth/login', { email, password }).then(r => r.data);
export const getStats = () => API.get('/stats').then(r => r.data);
export const getMessages = () => API.get('/messages').then(r => r.data);
export const deleteMessage = (id: string) => API.delete(`/messages/${id}`);
export const createProject = (data: object) => API.post('/projects', data).then(r => r.data);
export const updateProject = (id: string, data: object) => API.put(`/projects/${id}`, data).then(r => r.data);
export const deleteProject = (id: string) => API.delete(`/projects/${id}`);
export const createSkill = (data: object) => API.post('/skills', data).then(r => r.data);
export const deleteSkill = (id: string) => API.delete(`/skills/${id}`);
