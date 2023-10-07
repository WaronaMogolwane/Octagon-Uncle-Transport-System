import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";
import { FIRESTORE_DB, GetUserUid } from "../Firebase/FirebaseConfig";
import { Parent } from "../Models/Parent";

export const AddParentToDatabase = async (parent: Parent) => {
  try {
    await setDoc(doc(FIRESTORE_DB, "Users", GetUserUid()), parent);

    console.log("Parent added successfuly");
  } catch (e) {
    console.error(e);
  }
};

export const GetParentFromDatabase = async () => {
  try {
    const docRef = doc(FIRESTORE_DB, "Users", GetUserUid());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let snapshot = docSnap.data();
      //console.log("Document data:", docSnap.data());

      let parent = new Parent(
        snapshot.firstName,
        snapshot.lastName,
        snapshot.email,
        snapshot.idNumber,
        snapshot.email,
        snapshot.role,
        snapshot.addressLine1,
        snapshot.addressLine2,
        snapshot.suburb,
        snapshot.cityTown,
        snapshot.provinceState,
        snapshot.postalCode
      );
      return parent;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAllParentsFromDatabase = async () => {
  try {
    let parentArray: Parent[] = [];

    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "Users"));
    querySnapshot.docs.forEach((doc) => {
      let snapshot = doc.data();

      let parent = new Parent(
        snapshot.firstName,
        snapshot.lastName,
        snapshot.email,
        snapshot.idNumber,
        snapshot.email,
        snapshot.role,
        snapshot.addressLine1,
        snapshot.addressLine2,
        snapshot.suburb,
        snapshot.cityTown,
        snapshot.provinceState,
        snapshot.postalCode
      );

      parentArray.push(parent);
    });

    parentArray = [...parentArray];

    return parentArray;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteParentFromDatabase = async () => {
  try {
    await deleteDoc(doc(FIRESTORE_DB, "Users", GetUserUid()));
    console.log("Parent deleted");
  } catch (error) {
    console.log(error);
  }
};

export const UpdateParentInDatabase = async (parent: Parent) => {
  const docRef = doc(FIRESTORE_DB, "Users", GetUserUid());

  try {
    await runTransaction(FIRESTORE_DB, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }

      transaction.update(docRef, {
        firstName: parent.firstName,
        lastName: parent.lastName,
        cellphone: parent.cellphone,
        idNumber: parent.idNumber,
        email: parent.email,
        addressLine1: parent.addressLine1,
        addressLine2: parent.addressLine2,
        suburb: parent.suburb,
        cityTown: parent.cityTown,
        provinceState: parent.provinceState,
        postalCode: parent.postalCode,
        role: parent.role,
      });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};
