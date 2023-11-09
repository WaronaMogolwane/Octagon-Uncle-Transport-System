<<<<<<<< HEAD: Server / src / Data / database - helper.js
require("dotenv").config();
const { promises } = require("nodemailer/lib/xoauth2");
const mysql = require("mysql2");
========
import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";
import mysql2 from "mysql2/promise";
>>>>>>>> 3ee3b93 (Typescript and Modules compatibility):Server/src/Models/DatabaseModel.ts
const host = process.env.HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const databaseName = process.env.DATABASE;
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
      function (error, results, fields) {
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
<<<<<<<< HEAD:Server/src/Data/database-helper.js
}
async function SaveUserOtp(req, res, next) {
========
};
export const SaveUserOtp = async (otp: string, req, res, next) => {
  console.log(otp);
  let UserRegistration;
>>>>>>>> 3ee3b93 (Typescript and Modules compatibility):Server/src/Models/DatabaseModel.ts
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
    function (error, results, fields) {
      if (error) {
        console.log(error);
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
<<<<<<<< HEAD:Server/src/Data/database-helper.js
}
async function GetUserByEmail(email) {
========
};
export const GetUserByEmail = async (email) => {
>>>>>>>> 3ee3b93 (Typescript and Modules compatibility):Server/src/Models/DatabaseModel.ts
  var sqlQuery = `SELECT * FROM User WHERE Email= "${email}" `;
  const mysql2 = require("mysql2/promise");
  const connection = await mysql2.createConnection(dbConnectObj);
  const [rows] = await connection.execute(sqlQuery);
  return rows[0];
<<<<<<<< HEAD:Server/src/Data/database-helper.js
}
async function CheckOtp(otpDetails) {
========
};
export const CheckOtp = async (otpDetails) => {
>>>>>>>> 3ee3b93 (Typescript and Modules compatibility):Server/src/Models/DatabaseModel.ts
  var sqlQuery = `SELECT * FROM User_OTP WHERE Email= "${otpDetails.email}" AND OTP = '${otpDetails.otp}' `;
  const mysql2 = require("mysql2/promise");
  const connection = await mysql2.createConnection(dbConnectObj);
  const [rows] = await connection.execute(sqlQuery);
  return rows[0];
<<<<<<<< HEAD:Server/src/Data/database-helper.js
}
function InitDatabaseTables() {
========
};
export const InitDatabaseTables = () => {
>>>>>>>> 3ee3b93 (Typescript and Modules compatibility):Server/src/Models/DatabaseModel.ts
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
    function (error, results) {
      if (error) {
        console.log(error.message);
        return;
      } else {
        console.log("Database successfully initialised");
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
    function (error, results) {
      if (error) {
        console.log(error.message);
        return;
      } else {
        console.log("Database successfully initialised");
      }
    }
  );
<<<<<<<< HEAD:Server/src/Data/database-helper.js
}
function dbConnect() {
  pool.execute((error) => {
    if (error) {
      console.log(error);
      return;
    }
  });
}
function dbDisconnect() {
  pool.end();
}

module.exports = {
  InitDatabaseTables,
  AddNewUser,
  SaveUserOtp,
  CheckOtp,
  GetUserByEmail,
};
========
};
// function dbConnect() {
//   pool.execute((error) => {
//     if (error) {
//       console.log(error);
//       return;
//     }
//   });
// }
// function dbDisconnect() {
//   pool.end();
// }
>>>>>>>> 3ee3b93 (Typescript and Modules compatibility):Server/src/Models/DatabaseModel.ts
