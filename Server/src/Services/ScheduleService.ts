import schedule from "node-schedule";
import { AutoInsertPassengerSchedule } from "../Models/PassengerScheduleModel";
import { AutoInsertTrip } from "../Models/TripModel";

export const StartSchedule = () => {
  const ScheduleTripJob = schedule.scheduleJob("30 * * * * *", function () {
    const date = new Date();
    let day = date.toLocaleString("en-us", { weekday: "long" });

    AutoInsertPassengerSchedule(day, (error, result) => {
      if (result) {
        console.log(result);
      } else if (error) {
        console.log(error);
      } else {
        console.log("The Schedule ran but it got neither response Nick :(");
      }
    });
  });

  const AddTripSchedule = schedule.scheduleJob("45 * * * * *", function () {
    AutoInsertTrip((error, result) => {
      if (result) {
        console.log(result);
      } else if (error) {
        console.log(error);
      } else {
        console.log("The Schedule ran but it got neither response Nick :(");
      }
    });
  });
};
