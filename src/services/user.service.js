import axios from "@/lib/axios/axios";

const AUTH_PATH = "/auth";

async function login(user) {
  const response = await axios.post(`${AUTH_PATH}/login`, {
    username: user.username,
    password: user.password,
  });
  return response;
}

function register(user) {
  return axios.post(`${AUTH_PATH}/register`, {
    username: user.username,
    password: user.password,
  });
}

const UserService = {
  login,
  register,
};

export default UserService;
