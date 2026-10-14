import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from 'src/config-global';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
  (config) => {
    // Prevent accidental same-origin calls in production when API base URL is missing.
    if (!HOST_API) {
      return Promise.reject(
        new Error(
          'Missing NEXT_PUBLIC_HOST_API. Set it in your environment (Vercel Project → Settings → Environment Variables) to your backend URL (e.g. https://api.example.com).'
        )
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const poster = async (args: string | [string, any]) => {
  const [url, data] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export const putter = async (args: string | [string, any]) => {
  const [url, data] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.put(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};

export const patcher = async (url: string, { arg }: { arg?: any }) => {
  const res = await axiosInstance.patch(url, arg, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/profile',
    login: '/login',
    register: '/signup/caregiver',
    forgotPassword: '/forgot-password',
    verifyOtpAndChangePassword: '/reset-password',
    verifyRegistrationOtp: '/verify-otp-code',
    resendOtp: '/forgot-password',
    resendAccountCode: '/resend-code',
    magicLinkLogin: '/magic-link-login',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  dashboard: {
    streak: '/streak/:id',
    stats: '/dashboard',
    recentUsers: '/users',
    userDetails: '/user',
    deleteUser: '/delete-user/{userId}/{role}',
    weeklyAccuracy: '/exercise-progress/weekly-accuracy/{id}',
    caregiverUnlink: '/unlink-caregiver/{primaryUserId}/{caregiverId}',
    addPrimaryUser: '/user-caregiver/add-primary-user',
    linkPrimaryUser: '/user-caregiver/link-primary-user',
    primaryUserCredentials: '/user-caregiver/primary-user/{primaryUserId}',
  },
  feedback: {
    stats: '/feedback/stats',
    list: '/feedback/list',
    create: '/feedback/create',
    delete: '/feedback/{feedbackId}',
  },
  exerciseProgress: {
    tabs: '/exercise-progress/tabs/{id}',
    exercisesStats: '/exercise-progress/exercises/{id}',
    dailyReport: '/exercise-progress/list/{id}',
    chartData: '/exercise-progress',
  },
  exercise: {
    list: '/exercise/list',
    details: '/exercise/{exerciseId}',
    update: '/exercise/{exerciseId}',
    delete: '/exercise/{exerciseId}',
  },
  students: {
    list: '/get-students',
    details: '/get-student/{id}',
    delete: '/delete-student/{id}',
    submissions: '/student-submissions/{id}',
    feedback: '/review-submission',
  },
  profile: {
    update: '/update-user',
    changePassword: '/change-password',
  },
  submissions: {
    list: '/get-submissions',
  },
};
