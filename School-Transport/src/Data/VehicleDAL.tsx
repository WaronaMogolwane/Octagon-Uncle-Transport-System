import {
    DATABSE
} from "@env";
import { setDoc, doc, addDoc } from "firebase/firestore";
import { FIRESTORE_DB, GetUserUid } from "../Firebase/FirebaseConfig";
import { Vehicle } from "../Models/VehicleModel";

export const AddVehicleToDatabase = async (vehicleDetails: Vehicle) => {
    let response: string = "";

    const firestireVehiclesRef = doc(FIRESTORE_DB, DATABSE, "Users", GetUserUid(), "Assets", "Vehicles", vehicleDetails.licencePlate);
    let data = {
        ownerId: vehicleDetails.ownerId,
        make: vehicleDetails.make,
        model: vehicleDetails.model,
        yearModel: vehicleDetails.yearModel,
        registrationNo: vehicleDetails.registrationNo,
        vinNo: vehicleDetails.vinNo,
        engineNo: vehicleDetails.engineNo,
        licencePlate: vehicleDetails.licencePlate,
        colour: vehicleDetails.colour,
    }
    try {
        await setDoc(firestireVehiclesRef, data, { merge: true }).then(() => {
            response = "Success";
        }
        );
    }
    catch (e) {
        console.error(e);
        response = "Failed: " + e
    }
    return response;
}; 
