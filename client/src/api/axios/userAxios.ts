import axios from "axios";
import { BASE_URL } from "../endpoints/authEndpoints";

   export const userAxios = axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
