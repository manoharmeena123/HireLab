import { WritableProfileData } from "../types/index";


export const queries = {
  updateProfile: {
    query: (data: WritableProfileData) => ({
      url: "api/update-job-poster-profile",
      method: "POST",
      body: data,
    }),
  },
  postProfile :{
    query :(data :any) =>({
        url :"api/update-job-seeker-profile",
        method: "POST",
        body: data,
    })
  }
};
