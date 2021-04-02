import axios from "@/lib/axios/axios";

const AUTH_PATH = "/auth/";

async function login(user) {
  const response = await axios.post(AUTH_PATH + "login", {
    username: user.username,
    password: user.password,
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
}

function logout() {
  localStorage.removeItem("user");
}

async function register(user) {
  return await axios.post(AUTH_PATH + "register", {
    username: user.username,
    password: user.password,
  });
}

const AuthService = {
  login,
  logout,
  register,
};

export default AuthService;
