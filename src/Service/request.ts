import api from "./axiosInstence";

type userInfoType = {
  userName: string;
  password: string;
};

export async function getData() {
  return await api.get("/auth/getData");
}

export async function RegisterService({ userName, password }: userInfoType) {
  return await api.post("/auth/register", { userName, password });
}
export async function LoginService({ userName, password }: userInfoType) {
  return await api.post("/auth/login", { userName, password });
}
