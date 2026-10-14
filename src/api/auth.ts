import axiosInstance, { endpoints } from 'src/utils/axios';
// ------------------------

export async function forgotPasswordAPI(email: string) {
  const payload = { email };
  const response = await axiosInstance.post(endpoints.auth.forgotPassword, payload);
  return response.data;
}

export async function verifyOtpAndChangePasswordAPI(email: string, code: string, password: string) {
  const payload = { email, code, password };
  const response = await axiosInstance.post(endpoints.auth.verifyOtpAndChangePassword, payload);
  return response.data;
}

export async function resendOtpAPI(email: string) {
  const payload = { email };
  const response = await axiosInstance.post(endpoints.auth.resendOtp, payload);
  return response.data;
}

export async function verifyRegistrationOtpAPI(email: string, code: string) {
  const payload = { email, code, role: 'Caregiver' };
  const response = await axiosInstance.post(endpoints.auth.verifyRegistrationOtp, payload);
  return response.data;
}

export async function resendAccountCodeAPI(email: string) {
  const payload = { email };
  const response = await axiosInstance.post(endpoints.auth.resendAccountCode, payload);
  return response.data;
}

export async function magicLinkLoginAPI(token: string) {
  const response = await axiosInstance.get(endpoints.auth.magicLinkLogin, {
    params: { token },
  });
  return response.data;
}