import { Timestamp } from "firebase/firestore"

export type Wallet = {
    name: string,
    amount: number,
    main: boolean,
    icon?: string,
    expenses?: Expense[]
    incomes?: Income[]
}

export type Expense = {
    id: number,
    createdAt: Timestamp,
    amount: number,
    concept: string,
    comment?: string
}

export type Income = {
    id: number,
    createdAt: Timestamp,
    amount: number,
    concept: string,
    comment?: string
}