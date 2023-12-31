import { apiInstance } from "./index";
import { instanceWithAuth } from "./interceptors";
import { ApiSuccessMessage } from "../type/ApiSuccessMessage";
import { SignupSubmitFormValue, LoginFormValue, LoginResultValue, ApiGetUserInfo } from "../type/Accounts";
import { GetFinancialDictionary } from "../type/Dictionary";
import { GetFollows, GetUserDetailsInfo } from "../type/MemberInfo";
const api = apiInstance("spring-service");
const apiWithAuth = instanceWithAuth("spring-service");
export const checkEmail = async (email: string): Promise<ApiSuccessMessage> => {
  const { data } = await api.get("/users/inquiry-email", { params: { email: email } });
  return data;
};

export const sendEmail = async (email: string): Promise<ApiSuccessMessage> => {
  const { data } = await api.get("/email/verify", { params: { email: email } });
  return data;
};
export const confirmEmail = async (email: string, code: string): Promise<ApiSuccessMessage> => {
  const { data } = await api.get("/email/authenticate", { params: { email: email, code: code } });
  return data;
};

export const checkNickname = async (nickname: string): Promise<ApiSuccessMessage> => {
  const { data } = await api.get("/users/inquiry-nickname", { params: { nickname: nickname } });
  return data;
};
export const signup = async (user: SignupSubmitFormValue): Promise<ApiSuccessMessage> => {
  const { data } = await api.post("/users", user);
  return data;
};
export const login = async (user: LoginFormValue): Promise<LoginResultValue> => {
  const { data } = await api.post("/login/login/inbest", user);
  return data;
};
export const oauthlogin = async (authorizeCode: string, provider: string): Promise<LoginResultValue> => {
  const { data } = await api.post(`/login/login/${provider}`, { authorizeCode });
  return data;
};

export const logout = async (): Promise<ApiSuccessMessage> => {
  const { data } = await apiWithAuth.post("/login/logout");
  return data;
};
export const getUserInfo = async (seq: number): Promise<ApiGetUserInfo> => {
  const { data } = await apiWithAuth.get(`/users/${seq}`);
  return data;
};
export const upadateUserInfo = async (seq: number, user: FormData): Promise<ApiGetUserInfo> => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const { data } = await apiWithAuth.put(`/users/${seq}`, user, {
    headers: headers,
  });
  return data;
};

export const passwordUpdate = async (seq: number, password: string): Promise<ApiSuccessMessage> => {
  const { data } = await apiWithAuth.put(`/users/${seq}/password`, { password });
  return data;
};
export const changeDefaultImg = async (seq: number): Promise<ApiSuccessMessage> => {
  const { data } = await apiWithAuth.put(`/users/${seq}/img`);
  return data;
};
export const getMemberInfo = async (seq: number): Promise<GetUserDetailsInfo> => {
  const { data } = await apiWithAuth.get(`/users/${seq}/details`);
  return data;
};
export const getDictionary = async (keyword: string): Promise<GetFinancialDictionary> => {
  const { data } = await apiWithAuth.get("financial-dictionary", {
    params: { pageNo: 1, pageSize: 1000, keyword },
  });
  return data;
};
export const putFollow = async (followingSeq: number): Promise<ApiSuccessMessage> => {
  const { data } = await apiWithAuth.post(`friends/follow/${followingSeq}`);
  return data;
};
export const deleteFollow = async (followingSeq: number): Promise<ApiSuccessMessage> => {
  const { data } = await apiWithAuth.delete(`friends/follow/${followingSeq}`);
  return data;
};

export const getFollow = async (followingSeq: number, type: string | null): Promise<GetFollows> => {
  if (type === "following") {
    const { data } = await apiWithAuth.get(`friends/followings/${followingSeq}`);
    return data;
  } else {
    const { data } = await apiWithAuth.get(`friends/followers/${followingSeq}`);
    return data;
  }
};
