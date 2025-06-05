import { Application } from "express";
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

/**
 * Registers all application routes with the Express application.
 *
 * This function iterates through a predefined array of route definitions and
 * mounts each route handler to the Express application instance.  This
 * centralizes route registration, promoting modularity and maintainability.
 *
 * @param {Application} app The Express application instance to register routes with.
 * @returns {void}
 */
export function RegisterRoutes(app: Application): void {
    const routes = [
        { path: "/auth", route: authRoute },
        { path: "/user", route: userRoute },
        { path: "/user-profile", route: userProfileRoute },
        { path: "/passenger", route: passengerRoute },
        { path: "/trip", route: tripRoute },
        { path: "/vehicle", route: vehicleRoute },
        { path: "/business-detail", route: businessDetailRoute },
        { path: "/banking-detail", route: bankingDetailRoute },
        { path: "/payments", route: paymentsRoute },
        { path: "/push-notifications", route: pushNotificationsRoute },
        { path: "/passenger-driver-vehicle-linking", route: passengerDriverVehicleLinkingRoute },
        { path: "/passenger-schedule", route: passengerScheduleRoute },
        { path: "/driver-vehicle-linking", route: driverVehicleLinkingRoute },
    ];

    // Dynamically register all routes
    routes.forEach(({ path, route }) => {
        app.use(path, route); // Mount the route handler at the specified path
    });
}
