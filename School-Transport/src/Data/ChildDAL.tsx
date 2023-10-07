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
import { Child } from "../Models/Child";

export const AddChildToDatabase = async (child: Child) => {
  const docRef = doc(
    FIRESTORE_DB,
    "Users",
    GetUserUid(),
    "Children",
    child.childId.toString()
  );

  try {
    await setDoc(
      doc(
        FIRESTORE_DB,
        "Users",
        GetUserUid(),
        "Children",
        child.childId.toString()
      ),
      {
        childId: child.childId,
        age: child.age,
        firstName: child.firstName,
        lastName: child.lastName,
        sex: child.sex,
      }
    );
    console.log("Child added successfuly");
  } catch (e) {
    console.error(e);
  }
};

export const GetChildFromDatabase = async (childId: string) => {
  try {
    const docRef = doc(
      FIRESTORE_DB,
      "Users",
      GetUserUid(),
      "Children",
      childId
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let snapshot = docSnap.data();

      let child = new Child(
        snapshot.childId,
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

export const GetAllChildrenFromDatabase = async () => {
  try {
    let childArray: Child[] = [];

    const querySnapshot = await getDocs(
      collection(FIRESTORE_DB, "Users", GetUserUid(), "Children")
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

    console.log(childArray);

    return childArray;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteChildFromDatabase = async (childId: string) => {
  try {
    await deleteDoc(
      doc(FIRESTORE_DB, "Users", GetUserUid(), "Children", childId)
    );
    console.log("Child deleted");
  } catch (error) {
    console.log(error);
  }
};

export const UpdateChildInDatabase = async (child: Child) => {
  const docRef = doc(
    FIRESTORE_DB,
    "Users",
    GetUserUid(),
    "Children",
    child.childId.toString()
  );

  try {
    await runTransaction(FIRESTORE_DB, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }

      transaction.update(docRef, {
        age: child.age,
        firstName: child.firstName,
        lastName: child.lastName,
        sex: child.sex,
      });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};
