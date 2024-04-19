import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseCofing";
import uuid from "react-native-uuid";

export const createNewUser = async (
  auth: any,
  email: string,
  password: string
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    try {
      const userId = response.user.uid;
      const walletId = uuid.v4();

      await addDoc(collection(db, "wallets"), {
        userId,
        userWallets: [
          {
            walletId: walletId,
            name: "Main",
            icon: "main",
            main: true,
            amount: 0,
          },
        ],
      });

      await addDoc(collection(db, "expenses"), {
        userId,
        userExpenses: [
          {
            walletId,
            value: []
          }
        ],
      });
     
      await addDoc(collection(db, "incomes"), {
        userId,
        userIncomes: [
          {
            walletId,
            value: []
          }
        ],
      });
    } catch (error: any) {
      alert("No se pudo crear el cliente" + error.message);
    }
  } catch (error: any) {
    console.log(error);
    alert("No se pudo registrar " + error.message);
  }
};
