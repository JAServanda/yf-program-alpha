export interface Debtor {
  id: string;
  fullName: string;
  loanedAmount: number;
  interest: number;
  date: string;
}

export interface Transaction {
  id: string;
  debtorName: string;
  type: "payment" | "disbursement";
  amount: number;
  date: string;
}

export const debtors: Debtor[] = [
  {
    id: "1",
    fullName: "Juan Dela Cruz",
    loanedAmount: 10000,
    interest: 5,
    date: "2026-06-14",
  },
  {
    id: "2",
    fullName: "Maria Santos",
    loanedAmount: 5000,
    interest: 10,
    date: "2026-06-10",
  },
];

export const transactions: Transaction[] = [
  {
    id: "1",
    debtorName: "Juan Dela Cruz",
    type: "disbursement",
    amount: 10000,
    date: "2026-06-14",
  },
  {
    id: "2",
    debtorName: "Maria Santos",
    type: "disbursement",
    amount: 5000,
    date: "2026-06-10",
  },
  {
    id: "3",
    debtorName: "Juan Dela Cruz",
    type: "payment",
    amount: 2500,
    date: "2026-06-20",
  },
  {
    id: "4",
    debtorName: "Maria Santos",
    type: "payment",
    amount: 1000,
    date: "2026-06-22",
  },
];

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

export function getDashboardStats() {
  const totalLoaned = debtors.reduce(
    (sum, debtor) => sum + debtor.loanedAmount,
    0,
  );
  const totalPayments = transactions
    .filter((transaction) => transaction.type === "payment")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalDisbursements = transactions
    .filter((transaction) => transaction.type === "disbursement")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return {
    debtorCount: debtors.length,
    transactionCount: transactions.length,
    totalLoaned,
    totalPayments,
    totalDisbursements,
    outstandingBalance: totalDisbursements - totalPayments,
  };
}
