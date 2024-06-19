import React, { createContext, useState, useEffect, useContext } from 'react';
import { Wallet } from '../utils/types';
import { getUserWallets } from '../services/getUserWallets';
import { updateWalletAmount } from '../services/updateWalletAmount';

interface WalletProviderProps {
    children: React.ReactNode
}

interface WalletContextValue {
    wallets: Wallet[];
    isLoading: boolean;
    total: number;
    fetchWallets: () => void;
    substractAmount: (wallet: Wallet, amountToSubstract: number) => void;
    increaseAmount: (wallet: Wallet, amountToIncrease: number) => void;
}

// Creamos el contexto de las wallets
const WalletContext = createContext<WalletContextValue>({
    wallets: [],
    isLoading: true,
    total: 0,
    fetchWallets: () => { },
    substractAmount: () => { },
    increaseAmount: () => { }
});

// Creamos un componente proveedor para el contexto de las wallets
export const WalletProvider = ({ children }: WalletProviderProps) => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
    // console.log(wallets)
    const fetchWallets = async () => {
        const userWallets: Wallet[] = await getUserWallets();

        setWallets(userWallets);

        const totalAmount = userWallets.reduce((total, wallet) => total + wallet.amount, 0);
        setTotal(totalAmount);
        setIsLoading(false);
    };

    const substractAmount = async (walletToDebit: Wallet, amountToSubstract: number) => {
        const newWalletAmount = walletToDebit.amount - amountToSubstract;
        setTotal(total - amountToSubstract)
        setWallets((prevState) => {
            return prevState.map((prevWallet) => {
                if (prevWallet.walletId === walletToDebit.walletId) {
                    return { ...prevWallet, amount: newWalletAmount };
                }
                return prevWallet;
            });
        });
        try {
            updateWalletAmount(walletToDebit, newWalletAmount)
        } catch (error) {
            console.error('Error al actualizar el monto en la base de datos:', error);
        }
    };

    const increaseAmount = async (walletToIncrease: Wallet, amountToIncrease: number) => {
        const newWalletAmount = walletToIncrease.amount + amountToIncrease;
        setTotal(total + amountToIncrease)
        setWallets((prevState) => {
            return prevState.map((prevWallet) => {
                if (prevWallet.walletId === walletToIncrease.walletId) {
                    return { ...prevWallet, amount: newWalletAmount };
                }
                return prevWallet;
            });
        });
        try {
            updateWalletAmount(walletToIncrease, newWalletAmount)
        } catch (error) {
            console.error('Error al actualizar el monto en la base de datos:', error);
        }
    }

    useEffect(() => {
        fetchWallets();
    }, []);

    return (
        <WalletContext.Provider value={{ wallets, isLoading, total, fetchWallets, substractAmount, increaseAmount }}>
            {children}
        </WalletContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de las wallets
export const useWallets = () => useContext(WalletContext);
