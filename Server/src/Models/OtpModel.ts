import dotenv from "dotenv";
dotenv.config();

export const CreateOtp = (length: number): string => {
  let otp: string = "";
  const digits = "0123456789";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};
export const IsOtpVaid = (otpExpireDate: Date) => {
  if (otpExpireDate > new Date()) {
    return true;
  } else return false;
};
