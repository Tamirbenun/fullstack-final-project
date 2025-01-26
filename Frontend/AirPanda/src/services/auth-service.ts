import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL + "/Auth";

const register = (
  email: string,
  username: string,
  password: string,
  image: string
) => axios.post(`${baseUrl}/Register`, { email, username, password, image });

const login = (email: string, password: string) =>
  axios.post(`${baseUrl}/Login`, { email, password }).then((response) => {
    return response;
  });

export const auth = { register, login };
