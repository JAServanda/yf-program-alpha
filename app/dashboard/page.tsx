import { DataTable, PageHeader, StatCard, TransactionTypeBadge } from "@/components/dashboard-ui";
import {
  debtors,
  formatCurrency,
  getDashboardStats,
  transactions,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const stats = getDashboardStats();

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of debtors, loans, and recent activity."
      />

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <StatCard label="Debtors" value={String(stats.debtorCount)} />
        <StatCard label="Total Loaned" value={formatCurrency(stats.totalLoaned)} />
        <StatCard
          label="Outstanding Balance"
          value={formatCurrency(stats.outstandingBalance)}
        />
        <StatCard label="Transactions" value={String(stats.transactionCount)} />
      </div>

      <section className="flex flex-col gap-4">
        <PageHeader
          title="Recent Transactions"
          description="Latest payments and disbursements."
        />
        <DataTable
          headers={["Debtor", "Type", "Amount", "Date"]}
          rows={transactions.slice(0, 5).map((transaction) => [
            transaction.debtorName,
            <TransactionTypeBadge
              key={`${transaction.id}-type`}
              type={transaction.type}
            />,
            formatCurrency(transaction.amount),
            transaction.date,
          ])}
        />
      </section>

      <section className="flex flex-col gap-4">
        <PageHeader
          title="Active Debtors"
          description="Current borrowers and loan details."
        />
        <DataTable
          headers={["Name", "Loan Amount", "Interest", "Date"]}
          rows={debtors.map((debtor) => [
            debtor.fullName,
            formatCurrency(debtor.loanedAmount),
            `${debtor.interest}%`,
            debtor.date,
          ])}
        />
      </section>
    </>
  );
}
