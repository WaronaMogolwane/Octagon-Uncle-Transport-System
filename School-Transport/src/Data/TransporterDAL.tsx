import { setDoc, doc, getDoc, getDocs, collection, query, where, getCountFromServer, runTransaction, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB, GetUserUid } from "../Firebase/FirebaseConfig";
import { Transporter } from "../Models/TransporterDetailsModel";
import { BusinessDetails } from "../Models/BusinessDetailsModel";
import { v4 as uuidv4 } from "uuid";

let currentDate = new Date(Date.now());

export const AddTransporterToDatabase = async (transporterDetails: Transporter, transporterUid: string) => {
    const transporterDocRef = doc(FIRESTORE_DB, "Transporters", transporterUid)
    let response;
    let data = {
        firstName: transporterDetails.firstName,
        lastName: transporterDetails.lastName,
        Cellphone: transporterDetails.cellphone,
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
        await setDoc(transporterDocRef, data).then(() => {
            response = Promise.resolve("The transporter has been added successfully");
        });
    }
    catch (e) {
        response = Promise.reject("Failed: " + e);
    }
    return response;
};
export const GetTransporterDetails = async (transporterUid: string) => {
    let response;
    try {
        const transporterDocRef = doc(FIRESTORE_DB, "Transporters", transporterUid)
        const docSnap = await getDoc(transporterDocRef);

        if (docSnap.exists()) {
            let snapshot = docSnap.data();

            let transporter = new Transporter(
                snapshot.firstName,
                snapshot.lastName,
                snapshot.Cellphone,
                snapshot.idNumber,
                snapshot.email,
                snapshot.role,
                snapshot.addressLine1,
                snapshot.addressLine2,
                snapshot.suburb,
                snapshot.cityTown,
                snapshot.provinceState,
                snapshot.postalCode,
                snapshot.dateCreated
            );
            response = Promise.resolve(transporter);
        } else {
            response = Promise.reject("No such document!");
        }
    } catch (error) {
        response = Promise.reject(error);
    }
    return response;
};
export const CreateUserVerification = async (firstName: string, lastName: string, email: string, cellphone: string, verificationCode: string, transporterUid: string, userRole: number) => {
    const userVerificationRef = doc(FIRESTORE_DB, "Verification", verificationCode);
    let response;
    let data = {
        VerificationCode: verificationCode,
        TransporterUid: transporterUid,
        IsValid: true,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Cellphone: cellphone,
        DateCreated: currentDate,
        UserRole: userRole,
    }
    try {
        await setDoc(userVerificationRef, data).then(() => {
            response = Promise.resolve("User verification successfully created");
        });
    }
    catch (e) {
        response = Promise.reject("Failed: " + e);
    }
    return response;
};
export const CheckIfUserVerificationExists = async (verificationCode: string, userRole: string) => {
    const userColectionRef = collection(FIRESTORE_DB, "Verification");
    const userVerificationQuery = query(
        userColectionRef,
        where("verificationCode", "==", verificationCode),
        where("IsValid", "==", true),
        where("UserRole", "==", userRole)
    );
    const snapshot = await getCountFromServer(userVerificationQuery);
    if (snapshot.data().count > 0) {
        return true;
    }
    else {
        return false;
    }
};
export const UpdateTransporterDetails = async (transporterDetails: Transporter, transporterUid: string) => {
    let response;
    const transporterDocRef = doc(FIRESTORE_DB, "Transporters", transporterUid);
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
export const VerifyUser = async (verificationCode: string, userRole: number) => {
    let response;
    const userVerificationRef = doc(FIRESTORE_DB, "Verifications", verificationCode);
    let data = {
        isValid: true,
        dateVerified: currentDate
    };
    try {
        await runTransaction(FIRESTORE_DB, async (transaction) => {
            const verificationDoc = await transaction.get(userVerificationRef);
            if (verificationDoc.get("IsValid") && verificationDoc.get("UserRole") === userRole) {
                transaction.update(userVerificationRef, data);
                response = Promise.resolve("User Verified");
            }
            else {
                response = Promise.reject("Code Not valid");
            }
        });
    } catch (e) {
        response = Promise.reject("Transaction failed: " + e);
    }
    return response;
}
export const AddBusinessDetails = async (businessDetails: BusinessDetails, transporterUid: string) => {
    const businessDetailsDocRef = doc(FIRESTORE_DB, "Transporters", transporterUid, "Business", "Business Details")
    let response;
    let data = {
        BusinessName: businessDetails.businessName,
        Telephone: businessDetails.telephone,
        Email: businessDetails.email,
        AddressLine1: businessDetails.addressLine1,
        AddressLine2: businessDetails.addressLine2,
        Suburb: businessDetails.suburb,
        CityTown: businessDetails.cityTown,
        ProvinceState: businessDetails.provinceState,
        PostalCode: businessDetails.postalCode,
        DateCreated: currentDate
    }
    try {
        await setDoc(businessDetailsDocRef, data).then(() => {
            response = Promise.resolve("Business details saved successfully.");
        });
    }
    catch (e) {
        response = Promise.reject("Failed: " + e);
    }
    return response;
}; 
