import axiosClient from "./axiosClient";

const searchApi = {
  get: (query, page) => {
    const subUrl = "/search/anime";
    const config = {
      params: { q: query, page },
    };

    return axiosClient.get(subUrl, config);
  },
};

export default searchApi;
