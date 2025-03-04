import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = process.env.NEXT_PUBLIC_API;

export const login = async (payload) => {
  try {
    const response = await axios.post(`${api}/user/login`, payload);

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("token", response.data.data);
    localStorage.setItem("username", payload.username);
    localStorage.setItem("password", payload.password);

    return { status: true, token: response.data.data };
  } catch (error) {
    console.log("login failed : ", error);
    return { status: false, error };
  }
};

export function getCurrentUser(token) {
  const decode = jwtDecode(token);
  console.log(decode);
  return decode.user;
}
