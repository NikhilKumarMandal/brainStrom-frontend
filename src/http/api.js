import { api } from "./client";

// auth service
export const login = (token) => api.post("/auth/login", { token });

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

export const getUserById = (userId) => api.get(`/auth/${userId}`);

export const updateProfileLinks = (links) =>
  api.patch("/auth/updateProfile", links);

export const deleteProfileLink = (field) =>
  api.delete("/auth/profileLink", { data: { field } });

export const updateSkills = (skillsToAdd = [], skillsToRemove = []) => {
  return api.patch("/auth/updateSkills", {
    skillsToAdd,
    skillsToRemove,
  });
};

// ticket service
export const createTicket = (formData) =>
  api.post("/ticket/createTicket", formData);

export const getAllTicket = () => api.get("/ticket/getAllTicket");

export const getTicketById = (id) => api.get(`/ticket/getTicket/${id}`);

export const createDiscussion = (formData) =>
  api.post(`/discussion/createDiscussion`, formData);

export const getAllDiscussion = (id) =>
  api.get(`/discussion/getAllDiscussion/${id}`);

export const getTopDiscussion = (id) =>
  api.get(`/discussion/getTopDiscussion/${id}`);

// vote service
export const vote = (id, type) => api.post(`/vote/${id}`, { type });

// team service
export const getAllTeam = () => api.get("/team/getAllTeam");

export const createTeam = (formData) => api.post("/team/", formData);

export const requestJoinTeam = (teamId, description) =>
  api.post(`/team/request`, { teamId, description });

export const getTeamById = (teamId) => api.get(`/team/${teamId}`);

export const getTeamRequests = (teamId) => api.get(`/team/${teamId}/requests`);

export const respondRequest = (requestId, accept) =>
  api.post(`/team/response`, { requestId, accept });

export const disbandTeam = (teamId, reason) =>
  api.delete(`/team/${teamId}/disband`, { data: { reason } });

export const kickMember = (teamId, userId, reason) =>
  api.post(`/team/${teamId}/kick/${userId}`, { reason });

export const getMyTeams = () => api.get("/team/getMyTeams");

export const leaveTeam = (teamId, reason) =>
  api.post("/team/leaveTeam", { teamId, reason });

// team notice
export const editNotice = (teamId, content) =>
  api.post("/notice/", { teamId, content });

export const getNotice = (teamId) => api.get(`/notice/${teamId}`);

export const deleteNotice = (noticeId) =>
  api.delete(`/notice/${noticeId}/delete`);

// history
export const getUserHistory = (userId) => api.get(`/history/${userId}`);

export const getTeamHistory = (teamId) =>
  api.get(`/history/teamHistory/${teamId}`);
