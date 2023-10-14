import { AddTransporterToDatabase } from "../Data/TransporterDAL";
import { Transporter } from "../Models/TransporterDetailsModel";

export const AddTransporter = async (transporterDetails: Transporter, transporterUid: string) => {
    return await AddTransporterToDatabase(transporterDetails, transporterUid);
};