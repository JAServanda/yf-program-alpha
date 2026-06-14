"use client";

import { TransactionList } from "@/components/dashboard-ui";
import { useTransactions } from "@/components/transactions-provider";

export function TransactionHistoryPanel() {
  const { transactions } = useTransactions();

  return <TransactionList transactions={transactions} />;
}
