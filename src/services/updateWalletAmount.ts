import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, db } from "../../firebaseCofing";
import { Wallet } from "../utils/types";

export const updateWalletAmount = async (
  walletToDebit: Wallet,
  newWalletAmount: number
) => {
  const userId = FIREBASE_AUTH.currentUser?.uid;
  const walletsRef = collection(db, 'wallets');
  const querySnapshot = await getDocs(query(walletsRef, where("userId", "==", userId)));

  querySnapshot.forEach(async (doc) => {
      const walletData = doc.data();
      const userWallets = walletData.userWallets;
      const currentWalletIndex = userWallets.findIndex((wallet: any) => wallet.walletId === walletToDebit.walletId);

      if (currentWalletIndex !== -1) {
          const walletRef = doc.ref;
          const walletToUpdate = userWallets[currentWalletIndex];
          walletToUpdate.amount = newWalletAmount;

          await updateDoc(walletRef, { userWallets: [...userWallets] });
      }
  });
};
