import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL_API,
  headers: {
    "concent-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  //handle token
});

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    //handle error
    throw error;
  }
);

export default axiosClient;
