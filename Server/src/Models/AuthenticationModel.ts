import dotenv from "dotenv";
dotenv.config();
import { User } from "../Classes/User";
import { DbPool } from "../Services/DatabaseService";
import { UserCredentials } from "../Classes/UserCredentials";


export const InsertOtp = async (userId: string, email: string, otp: string, callback: (error, result) => void) => {
  DbPool.query('CALL public.sp_insert_otp($1::text,$2::text,$3::text)',
    [userId, email, otp],
    (err, res) => {
      //console.log(err ? err : res.rows[0].message) // Hello World!
      //
      if (err) {
        callback(err, null);
      }
      else {
        callback(null, res);
      }
    })
}
export const GetOtp = async (email: string, otp: string, callback: (error, result) => void) => {
  DbPool.query('SELECT * from public.fn_verify_otp($1::text,$2::text)',
    [email, otp],
    (err, res) => {

      if (err) {
        callback(err, null);
      }
      else {
        callback(null, res);
      }
    })
}
export const GetUserByEmailPassword = async (user: UserCredentials, callback: (error, result) => void) => {
  DbPool.query('SELECT * FROM public.fn_user_login($1::text,$2::text)',
    [user.email, user.password],
    (err, res) => {
      if (err) {
        callback(err, null);
      }
      else {
        callback(null, res);
      }
    })
}
export const InsertNewUser = async (user: User, callback: (error, result) => void) => {
  DbPool.query('CALL public.sp_insert_new_user($1::text,$2::text,$3::text,$4::text,$5::bit,$6::date,$7::integer)',
    [user.userId, user.email, user.password, user.cellphone, user.status, user.lastLogin, user.userRole],
    (err, res) => {
      //
      if (err) {
        callback(err, null);
      }
      else {
        callback(null, res);
      }
    })
}
export const GetUserByEmail = async (x: any) => {
  return true;
}