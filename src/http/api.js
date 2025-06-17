import { api } from "./client";

// auth service
export const login = (token) => api.post("/auth/login", { token });

export const self = () => api.get("/auth/self")

// ticket service

export const createTicket = ({
    title,
    description,
    courses
}
) => api.post("/ticket/createTicket",{
    title,
    description,
    courses
}
)

export const ticket = () => api.get("/ticket/getAllTicket");