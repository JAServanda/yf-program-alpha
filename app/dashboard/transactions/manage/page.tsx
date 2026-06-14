import { PageHeader } from "@/components/dashboard-ui";
import { TransactionManagePanel } from "@/components/transaction-manage-panel";

export default function TransactionManagePage() {
  return (
    <>
      <PageHeader
        title="Manage Transactions"
        description="Add new transactions or update and remove existing records."
      />
      <TransactionManagePanel />
    </>
  );
}
