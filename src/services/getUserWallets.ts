import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, db } from "../../firebaseCofing";

export const getUserWallets = async () => {
  try {
    if (FIREBASE_AUTH.currentUser) {
      const userId = FIREBASE_AUTH.currentUser.uid;
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("userId", "==", userId))
      );
      const userWallets : any = [];
      querySnapshot.forEach((doc) => {
        userWallets.push(...doc.data().wallets);
      });
      return userWallets;
    } else {
      console.log("No hay usuario autenticado.");
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
  }
};
