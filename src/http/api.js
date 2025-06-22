import { api } from "./client";

// auth service
export const login = (token) => api.post("/auth/login", { token });

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

// ticket service
export const createTicket = (formData) => api.post("/ticket/createTicket", formData);

export const getAllTicket = () => api.get("/ticket/getAllTicket");

export const getTicketById = (id) => api.get(`/ticket/getTicket/${id}`);

export const createDiscussion = (formData) => api.post(`/discussion/createDiscussion`, formData);

export const getAllDiscussion = (id) => api.get(`/discussion/getAllDiscussion/${id}`);

export const getTopDiscussion = (id) => api.get(`/discussion/getTopDiscussion/${id}`);

// vote service
export const vote = (id, type) => api.post(`/vote/${id}`, { type }) 

// Team service
export const getAllTeam = () => api.get("/team/getAllTeam");