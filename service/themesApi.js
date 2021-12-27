import axiosClient from "./axiosClient";

const themesApi = {
  get: (id) => {
    const subUrl = `/${id}`;
    const config = {
      baseURL: "https://themes.moe/api/themes",
    };
    return axiosClient.get(subUrl, config);
  },
};

export default themesApi;
