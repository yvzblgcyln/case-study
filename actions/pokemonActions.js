import axios from "axios";

export const getRequestItems = async (page, pageSize) => {
  const axres = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}?offset=${page}&limit=${pageSize}`);
  return axres;
};

export const getItem = async (id) => {
  const axres = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
  return axres;
};
