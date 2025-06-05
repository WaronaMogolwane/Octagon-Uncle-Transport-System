import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Generates a random OTP (One-Time Password) of the specified length.
 * @param length - Length of the OTP to generate.
 * @returns {string} - The generated OTP.
 */
export const CreateOtp = (length: number): string => {
  const digits = "0123456789";
  return Array.from({ length }, () => digits[Math.floor(Math.random() * digits.length)]).join('');
};

/**
 * Validates whether an OTP is still valid based on its expiry date.
 * @param otpExpireDate - The expiry date of the OTP.
 * @returns {boolean} - True if the OTP is still valid, false otherwise.
 */
export const IsOtpValid = (otpExpireDate: Date): boolean => {
  return otpExpireDate > new Date();
};
