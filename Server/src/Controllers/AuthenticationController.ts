import { GetUserByEmail, AddNewUser } from "../Models/DatabaseModel.ts";

export const CheckIfUserExists = async (req, res, next) => {
  if (await GetUserByEmail(req.body.userDetails.Email)) {
    res.status(400).send("User account already exists");
  } else {
    next();
  }
};

export const RegisterUser = (req, res, next) => {
  let user = {
    FirstName: req.body.userDetails.FirstName,
    LastName: req.body.userDetails.LastName,
    Email: req.body.userDetails.Email,
    Phone: req.body.userDetails.Phone,
    Password: req.body.userDetails.Password,
    AvatarUrl: "NULL",
  };
  AddNewUser(user).then(
    () => {
      res.status(200).json({
        UserCreated: true,
      });
    },
    (error) => {
      if (error.errno === 1062) {
        res.status(491).json({
          UserCreated: false,
          error: "User already exists",
        });
      } else {
        res.status(400).json({
          UserCreated: false,
          error: "There was an erorr while creating the user",
        });
      }
    }
  );
};
