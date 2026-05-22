import axios from 'axios';
import Cookies from 'js-cookie';


let lng;

// Create a function to get the access token from cookies
const getAccessToken = () => {
  return Cookies.get('token');
};

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

const getCurrentlang = () => {
  return localStorage.getItem("lng", languageCode);
};


export const storeLanguage = () => {
  let modifieduirl;
  const currentUrl = window.location.href;
  const url = new URL(currentUrl)
  const languageCode = url.pathname.split("/")[1];
  const newUrl = `${url.origin}/${languageCode}/signup`
  return modifieduirl = localStorage.setItem("url", newUrl);

}
// Add request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // console.log("response" ,response);

    return response;

  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // const currentUrl = window.location.href;
        // const url = new URL(currentUrl)
        // const languageCode = url.pathname.split("/")[1];
        // const newUrl = `${url.origin}/${languageCode}/signin`
        // window.location.href = `${newUrl}`;
      } else if (error.response.status === 403) {
        // Handle 403 error
      } else if (error.response.status === 500) {
        // Handle 500 error
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;