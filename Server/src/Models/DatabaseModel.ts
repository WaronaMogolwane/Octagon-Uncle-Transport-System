require("dotenv").config();
const { promises } = require("nodemailer/lib/xoauth2");
import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";
import mysql2 from "mysql2/promise";
import WinstonLogger from "../Utilities/WinstonLogger";
const host = process.env.OUTS_DATABASE_HOST;
const dbUser = process.env.OUTS_DATABASE_USER;
const dbPassword = process.env.OUTS_DATABASE_PASSWORD;
const databaseName = process.env.OUTS_DATABASE_NAME;
const UserTable = "User";
const userOtpTable = "User_OTP";
const pool = mysql.createPool({
  host: host,
  user: dbUser,
  password: dbPassword,
  database: databaseName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const dbConnectObj = {
  host: host,
  user: dbUser,
  password: dbPassword,
  database: databaseName,
};
function AddNewUser(user) {
  let AddNewUserPromise = new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO ${UserTable} (
        USER_ID, FirstName, LastName, Email, Phone, Password, DateCreated)
        VALUES (
            UUID(),  '${user.FirstName}',  '${user.LastName}', '${user.Email}', '${user.Phone}', '${user.Password}' , CURRENT_TIMESTAMP()
        )`,
      function (error, results) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)

        if (error) {
          reject(error.errno);
        } else {
          resolve(results);
        }
      }
    );
  });
  return AddNewUserPromise;
}
export const SaveUserOtp = async (otp: string, req, res) => {
  WinstonLogger.info(otp);
  let UserRegistration;
  try {
    var user = await GetUserByEmail(req.body.userDetails.Email);
  } catch (error) {
    console.error(error);
  }

  var userId;
  if (user) {
    userId = `'${user.User_ID}'`;
  } else {
    userId = `NULL`;
  }
  pool.query(
    `INSERT INTO ${userOtpTable} (
        User_ID, Email, OTP, DateCreated, OTPExpireDate)
        VALUES (${userId}, '${req.body.userDetails.Email}', '${otp}', CURRENT_TIMESTAMP(), ADDTIME(CURRENT_TIMESTAMP(), "0:03:0.0"))
        ON DUPLICATE KEY UPDATE OTP = '${req.body.otp}', DateCreated = CURRENT_TIMESTAMP(), OTPExpireDate = ADDTIME(CURRENT_TIMESTAMP(), "0:03:0.0")`,
    function (error) {
      if (error) {
        WinstonLogger.info(error);
      } else {
        res.status(201);
        res.send(
          (UserRegistration = {
            UserCreated: "Successfully",
            OtpSent: "Successfully",
          })
        );
      }
    }
  );
}
export const GetUserByEmail = async (email: any) => {
  var sqlQuery = `SELECT * FROM User WHERE Email= "${email}" `;
  const connection = await mysql2.createConnection(dbConnectObj);
  const [rows] = await connection.execute(sqlQuery);
  return rows[0];
}
export const CheckOtp = async (otpDetails) => {
  var sqlQuery = `SELECT * FROM User_OTP WHERE Email= "${otpDetails.email}" AND OTP = '${otpDetails.otp}' `;
  const connection = await mysql2.createConnection(dbConnectObj);
  const [rows] = await connection.execute(sqlQuery);
  return rows[0];
}
export const InitDatabaseTables = () => {
  pool.query(
    `CREATE TABLE IF NOT EXISTS ${UserTable}(
User_ID CHAR(36) PRIMARY KEY,
FirstName VARCHAR(255) NOT NULL,
LastName VARCHAR(255) NOT NULL,
Email VARCHAR(50) NOT NULL UNIQUE,
Phone VARCHAR(20) NOT NULL,
Password VARCHAR(40) NOT NULL,
AvatarURL VARCHAR(500),
DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`,
    function (error) {
      if (error) {
        WinstonLogger.info(error.message);
        return;
      } else {
        WinstonLogger.info("Database successfully initialised");
      }
    }
  );
  pool.query(
    `CREATE TABLE IF NOT EXISTS ${userOtpTable}(
        Email VARCHAR(50) PRIMARY KEY ,
        User_ID CHAR(36) ,
        OTP CHAR(5) NOT NULL,
        DateCreated TIMESTAMP,
        OTPExpireDate TIMESTAMP
        )`,
    function (error) {
      if (error) {
        WinstonLogger.info(error.message);
        return;
      } else {
        WinstonLogger.info("Database successfully initialised");
      }
    }
  );
}

module.exports = {
  InitDatabaseTables,
  AddNewUser,
  SaveUserOtp,
  CheckOtp,
  GetUserByEmail,
};
// function dbConnect() {
//   pool.execute((error) => {
//     if (error) {
//       logger.info(error);
//       return;
//     }
//   });
// }
// function dbDisconnect() {
//   pool.end();
// }