import { AddTransporterToDatabase } from "../Data/TransporterDAL";
import { Transporter } from "../Models/TransporterDetailsModel";

export const AddTransporter = async (transporterDetails: Transporter) => {
    return await AddTransporterToDatabase(transporterDetails);
};