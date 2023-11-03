import { randomUUID } from "crypto";
import { User } from "../Classes/User";
import { GetUserByEmail, AddNewUser, CreateNewUser } from "../Models/DatabaseModel";
import Router from 'express-promise-router';

export const CheckIfUserExists = async (req: any, res: any, next: any) => {
  if (await GetUserByEmail(req.body.userDetails.Email)) {
    res.status(400).send("User account already exists");
  } else {
    next();
  }
};

export const RegisterUser = async (req: any, res: any, next: any) => {
  let newUser = new User(
    randomUUID(),
    req.body.Email,
    req.body.Password,
    req.body.Cellphone,
    req.body.Status,
    req.body.LastLogin,
    req.body.UserRole
  );
  await CreateNewUser(newUser, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message
      }
      next(err);
    }
    else {
      res.status(200).json({
        UserCreated: true,
        result: result.rows[0]
      })
    }
    // return Promise.resolve({
    //   UserCreated: true,
    // });

  }
  );
};
