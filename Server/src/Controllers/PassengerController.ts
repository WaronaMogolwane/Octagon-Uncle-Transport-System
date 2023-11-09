import { randomUUID } from "crypto";
import { Passenger } from "../Classes/Passenger";
import { AddPassengerData } from "../Models/PassengerModel";

export const AddPassenger = async (req: any, res: any, next: any) => {
  let newPassenger = new Passenger(
    randomUUID(),
    req.body.passenger.FirstName,
    req.body.passenger.LastName,
    req.body.passenger.Age,
    req.body.passenger.Homeaddress,
    req.body.passenger.Destinationaddress,
    req.body.passenger.UserId
  );
  await AddPassengerData(newPassenger, (error, result) => {
    if (error) {
      let err: any = {
        status: error.status,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        PassengerCreated: true,
        result: result.rows[0],
      });
    }
  });
};
