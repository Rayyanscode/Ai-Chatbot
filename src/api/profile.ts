import axiosInstance, { endpoints } from 'src/utils/axios';

export async function updateProfileAPI(payload: { name: string; contactInfo: string }) {
  const response = await axiosInstance.patch(endpoints.profile.update, payload);
  return response.data;
}

export async function changePasswordAPI(payload: { oldPassword: string; newPassword: string }) {
  const response = await axiosInstance.put(endpoints.profile.changePassword, payload);
  return response.data;
}
