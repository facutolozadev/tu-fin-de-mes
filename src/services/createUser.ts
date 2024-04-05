import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseCofing";

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
      const userEmail = response.user.email;

      await addDoc(collection(db, "users"), {
        userId,
        userEmail,
        wallets: [
            {
                name: 'Main',
                icon: 'main',
                amount: 0,
                main: true
            }
        ]
      });

    } catch (error: any) {
      alert("No se pudo crear el cliente" + error.message);
    }
  } catch (error: any) {
    console.log(error);
    alert("No se pudo registrar " + error.message);
  }
};
