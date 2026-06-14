import { PageHeader } from "@/components/dashboard-ui";
import { TransactionHistoryPanel } from "@/components/transaction-history-panel";

export default function TransactionHistoryPage() {
  return (
    <>
      <PageHeader
        title="Transaction History"
        description="Review all recorded payments and disbursements."
      />
      <TransactionHistoryPanel />
    </>
  );
}
