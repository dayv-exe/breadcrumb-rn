import axiosInstance from '../constants/axios';

const usernameRegex = /^[a-zA-Z0-9._]+$/

export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  try {
    if (username.length < 3 || !usernameRegex.test(username)) return false
    const { data } = await axiosInstance.get(`/nickname_available/${username}`);
    return data.message;
  } catch (error) {
    console.log(error)
    return false
  }
};
