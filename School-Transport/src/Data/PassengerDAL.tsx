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
import { Passenger } from "../Models/Passenger";

export const AddPassengerToDatabase = async (
  passengerDetails: Passenger,
  uid: string,
  passengerId: string
) => {
  const docRef = doc(FIRESTORE_DB, "Client", uid, "Passenger", passengerId);

  try {
    await setDoc(docRef, {
      passengerId: passengerId,
      age: passengerDetails.age,
      firstName: passengerDetails.firstName,
      lastName: passengerDetails.lastName,
      sex: passengerDetails.sex,
    });
    console.log("Child added successfuly");
  } catch (e) {
    console.error(e);
  }
};

export const GetPassengerFromDatabase = async (
  passengerId: string,
  uid: string
) => {
  const docRef = doc(FIRESTORE_DB, "Client", uid, "Passenger", passengerId);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let snapshot = docSnap.data();

      let child = new Passenger(
        snapshot.passengerId,
        snapshot.firstName,
        snapshot.lastName,
        snapshot.age,
        snapshot.sex
      );

      console.log(child);

      return child;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAllPassengerFromDatabase = async (uid: string) => {
  try {
    let passengerArray: Passenger[] = [];

    const querySnapshot = await getDocs(
      collection(FIRESTORE_DB, "Client", uid, "Passenger")
    );
    querySnapshot.docs.forEach((doc) => {
      let snapshot = doc.data();

      let passenger = new Passenger(
        snapshot.passengerId,
        snapshot.firstName,
        snapshot.lastName,
        snapshot.age,
        snapshot.sex
      );

      passengerArray.push(passenger);
    });

    passengerArray = [...passengerArray];

    console.log(passengerArray);

    return passengerArray;
  } catch (error) {
    console.log(error);
  }
};

export const DeletePassengerFromDatabase = async (
  passengerId: string,
  uid: string
) => {
  const docRef = doc(FIRESTORE_DB, "Client", uid, "Passenger", passengerId);

  try {
    await deleteDoc(docRef);
    console.log("Child deleted");
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePassengerInDatabase = async (
  passengerDetails: Passenger,
  uid: string,
  passengerId: string
) => {
  const docRef = doc(FIRESTORE_DB, "Client", uid, "Passenger", passengerId);

  try {
    await runTransaction(FIRESTORE_DB, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }

      transaction.update(docRef, {
        age: passengerDetails.age,
        firstName: passengerDetails.firstName,
        lastName: passengerDetails.lastName,
        sex: passengerDetails.sex,
      });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};
