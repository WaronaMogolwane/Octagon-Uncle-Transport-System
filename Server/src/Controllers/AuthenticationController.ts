import { GetUserByEmail, AddNewUser } from "../Models/DatabaseModel";

export const CheckIfUserExists = async (req: any, res: any, next: any) => {
  if (await GetUserByEmail(req.body.userDetails.Email)) {
    res.status(400).send("User account already exists");
  } else {
    next();
  }
};

export const RegisterUser = (req: any, res: any, next: any) => {
  let user = req.body.userDetails;
  AddNewUser(user).then(
    () => {
      res.status(200).json({
        UserCreated: true,
      });
    },
    (error) => {
      next(error);
    }
  );
};
