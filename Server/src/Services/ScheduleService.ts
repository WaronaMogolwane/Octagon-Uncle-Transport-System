import schedule from "node-schedule";
import { AutoInsertPassengerSchedule } from "../Models/PassengerScheduleModel";
import { AutoInsertTrip } from "../Models/TripModel";
import { TruncatePassengerDriverVehicleLinking } from "../Models/PassengerDriverVehicleLinkingModel";

export const StartSchedule = () => {
  const AddPassengerDriverLinkingSchedule = schedule.scheduleJob(
    "5 0 * * *",
    function () {
      const date = new Date();
      let day = date.toLocaleString("en-us", { weekday: "long" });

      AutoInsertPassengerSchedule(day, (error, result) => {
        if (result) {
          console.log("Passengers inserted into PDVL table succesfully");
          console.log(
            "This job was supposed to run at 1205 but actually ran at " +
              new Date()
          );
        }
      });
    }
  );

  const AddTripSchedule = schedule.scheduleJob("10 0 * * *", function () {
    AutoInsertTrip((error, result) => {
      if (result) {
        console.log("Trips succesfully added to table");
        console.log(
          "This job was supposed to run at 1210 but actually ran at " +
            new Date()
        );
      }
    });
  });

  const ClearPassengerDriverVehicleLinkingSchedule = schedule.scheduleJob(
    " 1 0 * * *",
    function () {
      TruncatePassengerDriverVehicleLinking((error, result) => {
        if (result) {
          console.log("PDVL table truncated");
          console.log(
            "This job was supposed to run at 1201 but actually ran at " +
              new Date()
          );
        }
      });
    }
  );
};
