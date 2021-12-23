import axiosClient from "./axiosClient";

const searchApi = {
  get: (query, page) => {
    const subUrl = `/search/anime?q=${query}&page=${page}`;
    return axiosClient.get(subUrl);
  },
};

export default searchApi;
