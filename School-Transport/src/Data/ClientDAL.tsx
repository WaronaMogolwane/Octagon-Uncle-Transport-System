import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  runTransaction,
  query,
  where,
  and,
} from "firebase/firestore";
import { FIRESTORE_DB, GetUserUid } from "../Firebase/FirebaseConfig";
import { Client } from "../Models/Client";

export const AddClientToDatabase = async (
  clientDetails: Client,
  uid: string
) => {
  try {
    await setDoc(doc(FIRESTORE_DB, "Client", uid), clientDetails);

    console.log("Client added successfuly");
  } catch (e) {
    console.error(e);
  }
};

export const GetClientFromDatabase = async (uid: string) => {
  try {
    const docRef = doc(FIRESTORE_DB, "Client", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let snapshot = docSnap.data();

      let client = new Client(
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
        snapshot.postalCode,
        snapshot.transporterId
      );
      return client;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAllClientFromDatabase = async () => {
  try {
    let clientArray: Client[] = [];

    const q = query(
      collection(FIRESTORE_DB, "Client"),
      where("role", "==", 1),
      where("transporterId", "==", GetUserUid())
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
      let snapshot = doc.data();

      let client = new Client(
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
        snapshot.postalCode,
        snapshot.transporterId
      );

      clientArray.push(client);
    });

    clientArray = [...clientArray];

    return clientArray;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteClientFromDatabase = async (uid: string) => {
  try {
    await deleteDoc(doc(FIRESTORE_DB, "Client", uid));
    console.log("Parent deleted");
  } catch (error) {
    console.log(error);
  }
};

export const UpdateClientInDatabase = async (client: Client, uid: string) => {
  const docRef = doc(FIRESTORE_DB, "Client", uid);

  try {
    await runTransaction(FIRESTORE_DB, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }

      transaction.update(docRef, {
        firstName: client.firstName,
        lastName: client.lastName,
        cellphone: client.cellphone,
        idNumber: client.idNumber,
        email: client.email,
        addressLine1: client.addressLine1,
        addressLine2: client.addressLine2,
        suburb: client.suburb,
        cityTown: client.cityTown,
        provinceState: client.provinceState,
        postalCode: client.postalCode,
        role: client.role,
      });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};
