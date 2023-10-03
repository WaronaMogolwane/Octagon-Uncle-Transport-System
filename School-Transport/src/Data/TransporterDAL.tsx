import {
    DATABSE
} from "@env";
import { setDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB, GetUserUid } from "../Firebase/FirebaseConfig";
import { Transporter } from "../Models/TransporterDetailsModel";
import { BusinessDetails } from "../Models/BusinessDetailsModel";

export const AddTransporterToDatabase = async (transporterDetails: Transporter) => {
    let response: string = "";
    let data = {
        "firstName":transporterDetails.firstName,
        "lastName":transporterDetails.lastName,
        "cellphone":transporterDetails.cellphone,
        "idNumber":transporterDetails.email,
        "email":transporterDetails.email,
        "role":transporterDetails.role,
        "addressLine1":transporterDetails.addressLine1,
        "addressLine2":transporterDetails.addressLine2,
        "suburb":transporterDetails.suburb,
        "cityTown":transporterDetails.cityTown,
        "provinceState":transporterDetails.provinceState,
        "postalCode":transporterDetails.postalCode
    }
    try {
        await setDoc(doc(FIRESTORE_DB, DATABSE, "Users", GetUserUid(), "PersonalDetails"), data).then(() => {
            response = "Success";
        });
    }
    catch (e) {
        console.error(e);
        response = "Failed: " + e
    }
    return response;
}; 
export const AddBusinessDetails = async (businessDetails: BusinessDetails) => {
    let response: string = "";
    let data = {
        "businessName":businessDetails.businessName,
        "telephone":businessDetails.telephone,
        "email":businessDetails.email,
        "addressLine1":businessDetails.addressLine1,
        "addressLine2":businessDetails.addressLine2,
        "suburb":businessDetails.suburb,
        "cityTown":businessDetails.cityTown,
        "provinceState":businessDetails.provinceState,
        "postalCode":businessDetails.postalCode
    }
    try {
        await setDoc(doc(FIRESTORE_DB, DATABSE, "Users", GetUserUid(), "BusinessDetails"), data).then(() => {
            response = "Success";
        });
    }
    catch (e) {
        console.error(e);
        response = "Failed: " + e
    }
    return response;
}; 
