import axiosClient from "./axiosClient";

const animeApi = {
  getById: (id) => {
    const subUrl = `/anime/${id}`;
    return axiosClient.get(subUrl);
  },
};

export default animeApi;
