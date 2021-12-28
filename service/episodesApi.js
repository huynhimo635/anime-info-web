import axiosClient from "./axiosClient";

const episodesApi = {
  get: (id, page) => {
    const subUrl = `/anime/${id}/episodes/${page}`;
    return axiosClient.get(subUrl);
  },
};

export default episodesApi;
