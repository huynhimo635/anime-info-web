import axiosClient from "./axiosSlice";

const seasonalApi = {
  get: (year, season) => {
    const subUrl = `/season/${year}/${season}`;
    console.log(subUrl);
    return axiosClient.get(subUrl, { mode: "no-cors" });
  },
};

export default seasonalApi;
