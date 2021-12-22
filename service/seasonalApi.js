import axiosClient from "./axiosClient";

const seasonalApi = {
  get: (year, season) => {
    const subUrl = `/season/${year}/${season}`;
    return axiosClient.get(subUrl, { mode: "no-cors" });
  },
  getSeasonArchive: () => {
    const subUrl = "/season/archive";
    return axiosClient.get(subUrl);
  },
};

export default seasonalApi;
