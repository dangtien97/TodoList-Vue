import axios from "@/lib/axios/axios";

const AUTH_PATH = "/auth";

async function login(user) {
  const response = await axios.post(`${AUTH_PATH}/login`, {
    username: user.username,
    password: user.password,
  });
  if (response.token) {
    localStorage.setItem("user", JSON.stringify(response));
  }
  return response;
}

function logout() {
  localStorage.removeItem("user");
}

function register(user) {
  return axios.post(`${AUTH_PATH}/register`, {
    username: user.username,
    password: user.password,
  });
}

const UserService = {
  login,
  logout,
  register,
};

export default UserService;
