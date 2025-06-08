import { DbPool } from "../Services/DatabaseService";

/**
 * Executes a database query.
 * @param query - SQL query string with placeholders.
 * @param values - Array of values to substitute in the query.
 * @param callback - Callback function to handle query results or errors.
 */
const executeQuery = async (
  query: string,
  values: any[],
  callback: (error: any, result: any) => void
): Promise<void> => {
  DbPool.query(
    {
      sql: query,
      timeout: 40000,
      values,
    },
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

// Function for getting user by ID
export const GetUserByUserId = async (
  userId: string,
  callback: (error: any, result: any) => void
): Promise<void> => {
  await executeQuery("CALL GetUser(?);", [userId], callback);
};

// Function for checking user email by email address
export const CheckUserEmailByEmail = async (
  email: string,
  callback: (error: any, result: any) => void
): Promise<void> => {
  await executeQuery("CALL CheckUserEmail(?);", [email], callback);
};

// Function for updating user email by user ID
export const UpdateUserEmailByUserId = async (
  user: { email: string; userId: string },
  callback: (error: any, result: any) => void
): Promise<void> => {
  await executeQuery("CALL UpdateUserEmail(?,?);", [user.email, user.userId], callback);
};

// Function for updating user password by user ID
export const UpdateUserPasswordByUserId = async (
  user: { oldPassword: string; password: string; userId: string },
  callback: (error: any, result: any) => void
): Promise<void> => {
  await executeQuery("CALL UpdateUserPassword(?,?,?);", [user.oldPassword, user.password, user.userId], callback);
};

// Function for restoring user password by user ID
export const RestoreUserPasswordByUserId = async (
  user: { password: string; userId: string },
  callback: (error: any, result: any) => void
): Promise<void> => {
  await executeQuery("CALL RestoreUserPassword(?,?);", [user.password, user.userId], callback);
};

// Function for getting user active status by user ID
export const GetUserActiveStatusByUserId = async (
  userId: string,
  callback: (error: any, result: any) => void
): Promise<void> => {
  await executeQuery("CALL GetUserActiveStatus(?);", [userId], callback);
};
