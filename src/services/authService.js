// Development-only OTP authentication

export const DEV_OTP = "123456";

export async function requestLoginOtp(mobileNumber) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Development OTP: 123456",
    retryAfterSeconds: 30,
  };
}

export async function verifyLoginOtp(mobileNumber, otp) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (String(otp).trim() !== DEV_OTP) {
    throw new Error("Invalid OTP. Use 123456 for development.");
  }

  return {
    success: true,
    accessToken: "dev-token-" + Date.now(),
    customer: {
      id: 1,
      name: "Demo Customer",
      mobileNumber,
      walletBalance: 2500,
    },
  };
}