import axiosClient from "./axiosClient";

const themesApi = {
  get: (title) => {
    const subUrl = "";
    const config = {
      baseURL: `https://staging.animethemes.moe/api/anime/${title}?include=animethemes.animethemeentries.videos`,
    };
    return axiosClient.get(subUrl, config);
  },
};

export default themesApi;
