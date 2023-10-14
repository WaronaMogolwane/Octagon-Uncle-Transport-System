
import { setDoc, doc, addDoc, collection, getDocs, runTransaction } from "firebase/firestore";
import { FIRESTORE_DB, GetUserUid } from "../Firebase/FirebaseConfig";
import { Vehicle } from "../Models/VehicleModel";

let currentDate = new Date(Date.now());

export const AddVehicleToDatabase = async (vehicleDetails: Vehicle, transporterUid: string) => {
    let response;

    const firestireVehiclesRef = doc(FIRESTORE_DB, "Transporters", transporterUid, "Vehicles", vehicleDetails.licenceNo);
    let vehcileData = new Vehicle(
        vehicleDetails.ownerId,
        vehicleDetails.make,
        vehicleDetails.model,
        vehicleDetails.yearModel,
        vehicleDetails.registrationNo,
        vehicleDetails.vinNo,
        vehicleDetails.engineNo,
        vehicleDetails.licenceNo,
        vehicleDetails.colour,
        currentDate,
        currentDate
    )
    try {
        await setDoc(firestireVehiclesRef, vehcileData).then(() => {
            response = Promise.resolve("Vehicle added successfully");
        });
    }
    catch (e) {
        response = Promise.reject("Failed: " + e);
    }
    return response;
};
export const UpdateVehicleDetails = async (vehicleDetails: Vehicle, transporterUid: string) => {
    let response;
    const transporterDocRef = doc(FIRESTORE_DB, "Transporters", transporterUid);
    let data = {
        ownerId: vehicleDetails.ownerId,
        make: vehicleDetails.make,
        model: vehicleDetails.model,
        yearModel: vehicleDetails.yearModel,
        registrationNo: vehicleDetails.registrationNo,
        vinNo: vehicleDetails.vinNo,
        engineNo: vehicleDetails.engineNo,
        licenceNo: vehicleDetails.licenceNo,
        colour: vehicleDetails.colour,
        dateModified: currentDate
    }
    try {
        await runTransaction(FIRESTORE_DB, async (transaction) => {
            const transporterDoc = await transaction.get(transporterDocRef);
            if (transporterDoc.exists()) {
                transaction.update(transporterDocRef, data);
                response = Promise.resolve("Transporter personal details updated.");
            }
            else {
                response = Promise.reject("Transporter does not exist.");
            }
        });
    } catch (e) {
        response = Promise.reject("Transaction failed: " + e);
    }
    return response;
}
export const GetAllVehiclesFromDatabase = async (transporterUid: string) => {
    let response;
    const vehiclesCollectionRef = collection(FIRESTORE_DB, "Transporters", transporterUid, "Vehicles");
    try {
        let vehiclesArray: Vehicle[] = [];
        const querySnapshot = await getDocs(
            vehiclesCollectionRef
        );
        querySnapshot.docs.forEach((doc) => {
            let snapshot = doc.data();

            let vehcile = new Vehicle(
                snapshot.ownerId,
                snapshot.make,
                snapshot.model,
                snapshot.yearModel,
                snapshot.registrationNo,
                snapshot.vinNo,
                snapshot.engineNo,
                snapshot.licenceNo,
                snapshot.colour,
                snapshot.dateCreated,
                snapshot.dateModified
            );
            vehiclesArray.push(vehcile);
        });
        vehiclesArray = [...vehiclesArray];
        response = Promise.resolve(vehiclesArray);
    } catch (error) {
        response = Promise.reject(error);
    }
    return response;
};

