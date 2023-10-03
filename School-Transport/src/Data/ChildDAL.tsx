import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB, GetUserUid } from "../Firebase/FirebaseConfig";
import { Child } from "../Models/Child";

export const AddChildToDatabase = async (ChildlDetailsForm: Child) => {
  try {
    await updateDoc(doc(FIRESTORE_DB, "Users", GetUserUid()), {
      ChildlDetailsForm,
    });
    console.log("Child added successfuly");
  } catch (e) {
    console.error(e);
  }
};

export const GetChildDetailsFromDatabase = async () => {
  try {
    const docRef = doc(FIRESTORE_DB, "Users", GetUserUid(), "Children");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let snapshot = docSnap.data();
      //console.log("Document data:", docSnap.data());

      let child = new Child(
        snapshot.childId,
        snapshot.firstName,
        snapshot.lastName,
        snapshot.age,
        snapshot.sex
      );

      return child;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAllChildrenFromDatabase = async () => {
  try {
    let childArray: Child[] = [];

    const querySnapshot = await getDocs(
      collection(FIRESTORE_DB, "Users", GetUserUid(), "")
    );
    querySnapshot.docs.forEach((doc) => {
      let snapshot = doc.data();

      let child = new Child(
        snapshot.childId,
        snapshot.firstName,
        snapshot.lastName,
        snapshot.age,
        snapshot.sex
      );

      childArray.push(child);
    });

    childArray = [...childArray];

    return childArray;
  } catch (error) {
    console.log(error);
  }
};

export const deleteChildFromDatabase = async (id: String) => {
  try {
    await deleteDoc(doc(FIRESTORE_DB, "Users", GetUserUid(), "Children"));
    console.log("Child deleted");
  } catch (error) {
    console.log(error);
  }
};
