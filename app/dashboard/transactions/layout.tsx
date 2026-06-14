import { TransactionsProvider } from "@/components/transactions-provider";
import { TransactionsSubnav } from "@/components/transactions-subnav";

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransactionsProvider>
      <div className="flex flex-col gap-5 sm:gap-6">
        <TransactionsSubnav />
        {children}
      </div>
    </TransactionsProvider>
  );
}
