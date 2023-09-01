import axios from 'axios';

// const API_URL = 'https://api.covid19api.com/summary';

export  const fetchData = async (API_URL:string) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
