import {
    DATABSE
} from "@env";
import { setDoc, doc, getDoc, getDocs, collection, query, where, getCountFromServer, runTransaction } from "firebase/firestore";
import { FIRESTORE_DB, GetUserUid } from "../Firebase/FirebaseConfig";
import { Transporter } from "../Models/TransporterDetailsModel";
import { BusinessDetails } from "../Models/BusinessDetailsModel";
import { v4 as uuidv4 } from 'uuid';

let currentDate = new Date(Date.now());

export const AddTransporterToDatabase = async (transporterDetails: Transporter) => {
    let response: string = "";
    let data = {
        firstName: transporterDetails.firstName,
        lastName: transporterDetails.lastName,
        cellphone: transporterDetails.cellphone,
        idNumber: transporterDetails.email,
        email: transporterDetails.email,
        role: transporterDetails.role,
        addressLine1: transporterDetails.addressLine1,
        addressLine2: transporterDetails.addressLine2,
        suburb: transporterDetails.suburb,
        cityTown: transporterDetails.cityTown,
        provinceState: transporterDetails.provinceState,
        postalCode: transporterDetails.postalCode,
        dateCreated: currentDate
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
export const CreateParentVerification = async (firstName: string, lastName: string, email: string, cellphone: string, verificationCode: string, transporterUid: string) => {
    const parentVerificationRef = doc(FIRESTORE_DB, DATABSE, "Verification", "Parents", verificationCode);

    let response: string = "";
    let data = {
        verificationCode: verificationCode,
        transporterUid: transporterUid,
        isValid: false,
        firstName: firstName,
        lastName: lastName,
        email: email,
        cellphone: cellphone,
        dateCreated: currentDate
    }
    try {
        await setDoc(parentVerificationRef, data).then(() => {
            response = "Success";
        });
    }
    catch (e) {
        console.error(e);
        response = "Failed: " + e
    }
    return response;
};
export const CheckIfParentVerificationExists = async (verificationCode: string) => {
    const parentColectionRef = collection(FIRESTORE_DB, DATABSE, "Verification", "Parents");
    const q = query(
        parentColectionRef,
        where("verificationCode", "==", verificationCode),
        where("isValid", "==", false)
    );

    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
        return true;
    }
    else {
        return false;
    }
};

export const VerifyParent = async (verificationCode: string) => {
    const parentVerificationRef = doc(FIRESTORE_DB, DATABSE, "Verification", "Parents", verificationCode);
    let data = {
        isValid: true,
        dateVerified: currentDate
    };
    try {
        await runTransaction(FIRESTORE_DB, async (transaction) => {
            const tempVerificationDoc = await transaction.get(parentVerificationRef);
            if (!tempVerificationDoc.exists()) {
                throw "Document does not exist!";
            }
            transaction.update(parentVerificationRef, data);
        });
        return "Success";
    } catch (e) {
        return "Transaction failed: " + e;
    }
}
export const AddBusinessDetails = async (businessDetails: BusinessDetails) => {
    let response: string = "";
    let data = {
        businessName: businessDetails.businessName,
        telephone: businessDetails.telephone,
        email: businessDetails.email,
        addressLine1: businessDetails.addressLine1,
        addressLine2: businessDetails.addressLine2,
        suburb: businessDetails.suburb,
        cityTown: businessDetails.cityTown,
        provinceState: businessDetails.provinceState,
        postalCode: businessDetails.postalCode,
        dateCreated: currentDate
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
