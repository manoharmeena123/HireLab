import { WritableProfileFormData } from "../types/index";


export const queries = {
  postProfile :{
    query :(data :FormData) =>({
        url :"api/update-job-seeker-profile",
        method: "POST",
        body: data,
    })
  }
};