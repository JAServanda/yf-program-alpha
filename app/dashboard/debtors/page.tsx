import { DataTable, PageHeader } from "@/components/dashboard-ui";
import { debtors, formatCurrency } from "@/lib/mock-data";

export default function DebtorsPage() {
  return (
    <>
      <PageHeader
        title="Debtors"
        description="Manage borrower records and loan balances."
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
    </>
  );
}
