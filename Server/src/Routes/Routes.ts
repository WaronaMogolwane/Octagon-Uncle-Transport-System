import authRoute from "../Routes/AuthenticationRoutes";
import bankingDetailRoute from "../Routes/BankingDetailRoutes";
import businessDetailRoute from "../Routes/BusinessDetailRoutes";
import driverVehicleLinkingRoute from "../Routes/DriverVehicleLinkingRoutes";
import passengerDriverVehicleLinkingRoute from "../Routes/PassengerDriverVehicleLinkingRoutes";
import passengerRoute from "../Routes/PassengerRoutes";
import passengerScheduleRoute from "../Routes/PassengerScheduleRoutes";
import paymentsRoute from "../Routes/PaymentsRoute";
import pushNotificationsRoute from "../Routes/PushNotificationsRoute";
import tripRoute from "../Routes/TripRoutes";
import userProfileRoute from "../Routes/UserDetailRoutes";
import userRoute from "../Routes/UserRoutes";
import vehicleRoute from "../Routes/VehicleRoutes";

export function RegisterRoutes(app: any) {
    app.use("/auth", authRoute);
    app.use("/user", userRoute);
    app.use("/user-profile", userProfileRoute);
    app.use("/passenger", passengerRoute);
    app.use("/trip", tripRoute);
    app.use("/vehicle", vehicleRoute);
    app.use("/business-detail", businessDetailRoute);
    app.use("/banking-detail", bankingDetailRoute);
    app.use("/payments", paymentsRoute);
    app.use("/push-notifications", pushNotificationsRoute);
    app.use("/passenger-driver-vehicle-linking", passengerDriverVehicleLinkingRoute);
    app.use("/passenger-schedule", passengerScheduleRoute);
    app.use("/driver-vehicle-linking", driverVehicleLinkingRoute);
}