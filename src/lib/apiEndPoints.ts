import Env from "./Env";
export const Base_URL = Env.APP_URL
export const API_URL = Env.API_URL + "/api";
export const LOGIN_URL = API_URL + "/login";
export const REGISTER_URL = API_URL + "/register1";
export const CHECK_CREDENTIALS = API_URL + "/check-credentials";
export const LOGOUT_URL = API_URL + "/logout1";
export const CATEGORY_URL = API_URL + "/categories";
export const UPDATE_PROFILE = API_URL + "/update-profile";
export const JOB_POST_URL = API_URL + "/create-a-job";
export const CHANGE_PASSWORD_URL = API_URL + "/changepassword";
export const IMAGE_URL =  Env.API_URL +"/images/";
export const MANAGE_JOBS = API_URL + "/manage-jobs";

