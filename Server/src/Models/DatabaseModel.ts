import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";
import mysql2 from "mysql2/promise";
import { User } from "../Classes/User";
import { DbClient } from "../Services/DatabaseService";
import { error } from "console";
const host = process.env.HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const databaseName = process.env.DATABASE;
const UserTable = "Users";
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
export const AddNewUser = (user: any) => {
  let AddNewUserPromise = new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO ${UserTable} (
        UserId, Email, Password, Cellphone, Status, LastLogin, UserRole)
        VALUES (
            'e9rg-w993-fcsi-3eo9',  '${user.Email}',  '${user.Password}', '${user.Cellphone}', b'${user.Status}', '2000-01-01' , '${user.Role}'
        )`,
      function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)

        if (error) {
          console.error(error.code)
          reject(error.errno);
        } else {
          resolve(results);
        }
      }
    );
  });
  return AddNewUserPromise;
};
export const SaveUserOtp = async (otp: string, req, res, next) => {
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
        ON DUPLICATE KEY UPDATE OTP = '${otp}', DateCreated = CURRENT_TIMESTAMP(), OTPExpireDate = ADDTIME(CURRENT_TIMESTAMP(), "0:03:0.0")`,
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
};
export const GetUserByEmail = async (email) => {
  var sqlQuery = `SELECT * FROM User WHERE Email= "${email}" `;
  const connection = await mysql2.createConnection(dbConnectObj);
  const [rows] = await connection.execute(sqlQuery);
  return rows[0];
};
export const CheckOtp = async (otpDetails) => {
  var sqlQuery = `SELECT * FROM User_OTP WHERE Email= "${otpDetails.email}" AND OTP = '${otpDetails.otp}' `;
  const connection = await mysql2.createConnection(dbConnectObj);
  const [rows] = await connection.execute(sqlQuery);
  return rows[0];
};
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
      }
    }
  );
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

export const InsertOtp = async (userId: string, email: string, otp: string, callback: (error, result) => void) => {
  DbClient.connect((err) => {
    DbClient.query('CALL public.sp_insert_otp($1::text,$2::text,$3::text)',
      [userId, email, otp],
      (err, res) => {
        //console.log(err ? err : res.rows[0].message) // Hello World!
        DbClient.end()
        if (err) {
          callback(err, null);
        }
        else {
          callback(null, res);
        }
      })
  })
}
export const InsertNewUser = async (user: User, callback: (error, result) => void) => {
  DbClient.connect((err) => {
    DbClient.query('CALL public.sp_insert_new_user($1::text,$2::text,$3::text,$4::text,$5::bit,$6::date,$7::integer)',
      [user.userId, user.email, user.password, user.cellphone, user.status, user.lastLogin, user.userRole],
      (err, res) => {
        DbClient.end()
        if (err) {
          callback(err, null);
        }
        else {
          callback(null, res);
        }
      })
  })
}
