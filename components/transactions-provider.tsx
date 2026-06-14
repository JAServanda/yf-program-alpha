"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  transactions as initialTransactions,
  type Transaction,
} from "@/lib/mock-data";

const STORAGE_KEY = "yf-program-transactions";

type TransactionsContextValue = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
};

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

function createId() {
  return crypto.randomUUID();
}

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialTransactions,
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTransactions(JSON.parse(stored) as Transaction[]);
      } catch {
        setTransactions(initialTransactions);
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions, isReady]);

  const value = useMemo(
    () => ({
      transactions,
      addTransaction: (transaction: Omit<Transaction, "id">) => {
        setTransactions((current) => [
          { ...transaction, id: createId() },
          ...current,
        ]);
      },
      updateTransaction: (
        id: string,
        transaction: Omit<Transaction, "id">,
      ) => {
        setTransactions((current) =>
          current.map((item) =>
            item.id === id ? { ...transaction, id } : item,
          ),
        );
      },
      deleteTransaction: (id: string) => {
        setTransactions((current) =>
          current.filter((item) => item.id !== id),
        );
      },
    }),
    [transactions],
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within TransactionsProvider");
  }
  return context;
}
