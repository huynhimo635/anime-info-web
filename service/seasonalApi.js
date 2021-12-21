import axiosClient from "./axiosSlice";

const seasonalApi = {
  get: (year, season) => {
    const subUrl = `/season/${year}/${season}`;
    return axiosClient.get(subUrl, { mode: "no-cors" });
  },
};

export default seasonalApi;
