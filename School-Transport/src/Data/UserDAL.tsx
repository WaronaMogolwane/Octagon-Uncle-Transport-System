import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { FIRESTORE_DB, GetUserUid } from "../Firebase/FirebaseConfig";
import { Parent } from "../Models/UserData";

/*
export const AddParentToDatabase = async (parentDetails: Parent) => {
  try {
    const doc = addDoc(collection(FIRESTORE_DB, "parents"), {
      parentDetails,
    });
  } catch (error) {
    console.log(error);
  }
};
*/

export const AddUserToDatabase = async (personalDetailsForm: Parent) => {
  try {
    await setDoc(doc(FIRESTORE_DB, "Users", GetUserUid()), personalDetailsForm);
    console.log("Parent added successfuly");
  } catch (e) {
    console.error(e);
  }
};

export const GetUserDetailsFromDatabase = async () => {
  try {
    const docRef = doc(FIRESTORE_DB, "Users", GetUserUid());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let snapshot = docSnap.data();
      //console.log("Document data:", docSnap.data());

      let parent = new Parent(
        snapshot.firstName,
        snapshot.lastName,
        snapshot.age,
        snapshot.email
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

export const GetAllUsersFromDatabase = async () => {
  try {
    let parentArray: Parent[] = [];

    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "Users"));
    querySnapshot.docs.forEach((doc) => {
      let snapshot = doc.data();

      let parent = new Parent(
        snapshot.firstName,
        snapshot.lastName,
        snapshot.age,
        snapshot.email
      );

      parentArray.push(parent);
    });

    parentArray = [...parentArray];

    return parentArray;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserFromDatabase = async () => {
  try {
    await deleteDoc(doc(FIRESTORE_DB, "Users", GetUserUid()));
    console.log("Parent deleted");
  } catch (error) {
    console.log(error);
  }
};
