import api from './api';

export const loginUser = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
};

export const registerUser = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    return res.data;
};

export const getProfile = async () => {
    const res = await api.get('/auth/profile');
    return res.data;
};

export const getResumes = async () => {
    const res = await api.get('/resumes');
    return res.data;
};

export const getResumeById = async (id) => {
    const res = await api.get(`/resumes/${id}`);
    return res.data;
};

export const createResume = async (data) => {
    const res = await api.post('/resumes', data);
    return res.data;
};

export const updateResume = async (id, data) => {
    const res = await api.put(`/resumes/${id}`, data);
    return res.data;
};

export const deleteResume = async (id) => {
    const res = await api.delete(`/resumes/${id}`);
    return res.data;
};
