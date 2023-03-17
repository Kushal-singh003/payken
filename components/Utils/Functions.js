import axios from "axios";
import { ToastContainer, toast, Icons } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const withAuth = async ({ data, query }) => {
  console.log(data, query, "data is here");

  try {
    const response = await axios.post("/api/auth1/" + query, {
      data: data,
    });
    console.log(response, "response");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

// with token

export const withToken = async ({ data, query, token }) => {
  console.log(data, token, query, "data");
  try {
    const response = await axios.post("/api/auth2/" + query, {
      data: data,
      token: token,
    });
    console.log(response, "response");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const MerchantApi = async ({ data, query, token }) => {
  console.log(data, token, query, "data");
  try {
    const response = await axios.post("/api/auth4/" + query, {
      data: data,
      token: token,
    });
    console.log(response, "response");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
