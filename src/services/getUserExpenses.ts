import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, db } from "../../firebaseCofing";
import { Expense } from "../utils/types";

export const getUserExpenses = async (walletId: string | number[]) => {
  
  try {
    if (FIREBASE_AUTH.currentUser) {
      const userId = FIREBASE_AUTH.currentUser.uid;
      const querySnapshot = await getDocs(
        query(collection(db, "expenses"), where("userId", "==", userId))
      );
      if (!querySnapshot) {
        console.log('No se encontró colección expenses')
        return null;
      }
     

      const userExpenses: any = [];
      querySnapshot.forEach((doc) => {
        const expenses = doc.data().userExpenses.find((el: any) => el.walletId === walletId)
        userExpenses.push(...expenses.value);
      });

      return userExpenses;
    } else {
      console.log("No hay usuario autenticado.");
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
  }
};
