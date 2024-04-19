import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, db } from "../../firebaseCofing";

export const getUserIncomes = async (walletId : string | number[]) => {
  try {
    if (FIREBASE_AUTH.currentUser) {
      const userId = FIREBASE_AUTH.currentUser.uid;
      const querySnapshot = await getDocs(
        query(collection(db, "incomes"), where("userId", "==", userId))
      );

      if (!querySnapshot) {
        console.log("no se encontró colección expenses")
        return null;
      }

      const userIncomes: any = [];
      querySnapshot.forEach((doc) => {
        const incomes = doc.data().userIncomes.find((el: any) => el.walletId === walletId) 
        userIncomes.push(...incomes.value);
      });
      return userIncomes;
    } else {
      console.log("No hay usuario autenticado.");
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
  }
};
