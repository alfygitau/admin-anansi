import { publicClient } from "../client/public-client";

const getOrCreateDeviceId = () => {
  let id = localStorage.getItem("anansi_device_id");
  if (!id) {
    if (window.crypto?.randomUUID) {
      id = crypto.randomUUID();
    } else {
      id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16),
      );
    }
    localStorage.setItem("anansi_device_id", id);
    const maxAge = 60 * 60 * 24 * 365 * 5;
    document.cookie = `anansi_device_id=${id}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }

  return id;
};

const getUserAgent = () => {
  if (typeof window !== "undefined" && navigator) {
    return navigator.userAgent;
  }
  return null;
};

export const loginUser = async (username, password) => {
  try {
    const response = await publicClient.post(`/users/login`, {
      username: username,
      password: password,
      deviceId: getOrCreateDeviceId(),
      userAgent: getUserAgent(),
      platform: "web",
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const verifyUser = async (userId, otp, email, mobileno) => {
  try {
    const response = await publicClient.post(`/users/otp/verify-login`, {
      code: otp,
      isEmail: false,
      userId: userId,
      deviceId: getOrCreateDeviceId(),
      email: email,
      phoneNumber: mobileno,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const sendMobileOtp = async (userId) => {
  try {
    const response = await publicClient.post(`/otp`, {
      userId: userId,
      isEmail: false,
      isMobile: true,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const sendEmailOtp = async (userId) => {
  try {
    const response = await publicClient.post("/otp", {
      userId,
      isEmail: false,
    });
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
