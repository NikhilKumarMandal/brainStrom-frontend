import { api } from "./client";

// auth service
export const login = (token) => api.post("/auth/login", { token });

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

// ticket service
export const createTicket = (formData) => api.post("/ticket/createTicket", formData);

export const getAllTicket = () => api.get("/ticket/getAllTicket");

export const getTicketById = (id) => api.get(`/ticket/getTicket/${id}`);

export const voteDiscussion = (id, voteType) => api.post(`/ticket/vote/${id}`, { voteType });