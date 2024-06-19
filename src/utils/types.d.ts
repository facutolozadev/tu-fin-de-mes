import { Timestamp } from "firebase/firestore"

export type Wallet = {
    walletId?: tring | number[],
    name: string,
    amount: number,
    main: boolean,
    icon?: string,
    expenses?: Expense[]
    incomes?: Income[]
}

export type Expense = {
    id?: number,
    createdAt: any,
    amount: number,
    concept: string,
    comment?: string
}

export type Income = {
    id?: number,
    createdAt: Timestamp,
    amount: number,
    concept: string,
    comment?: string
}

export interface UserData {
    userId: string,
    userEmail: string,
    wallets: Wallet[]
}

export type WalletHookResult = {
    wallets: Wallet[];
    isLoading: boolean;
    fetchWallets: () => void;
    total: number;
  };