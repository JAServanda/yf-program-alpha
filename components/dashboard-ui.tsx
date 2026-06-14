import { cn } from "@/lib/utils";
import { formatCurrency, type Transaction } from "@/lib/mock-data";

export function PageHeader({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h1>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="glass-panel p-4 sm:p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm sm:normal-case sm:tracking-normal">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold sm:text-2xl">{value}</p>
    </div>
  );
}

export function TransactionTypeBadge({
  type,
}: {
  type: Transaction["type"];
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        type === "payment"
          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
          : "bg-sky-500/15 text-sky-700 dark:text-sky-300",
      )}
    >
      {type}
    </span>
  );
}

export function TransactionList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  if (transactions.length === 0) {
    return (
      <div className="glass-panel p-5 text-sm text-muted-foreground">
        No transactions recorded yet.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 md:hidden">
        {transactions.map((transaction) => (
          <article key={transaction.id} className="glass-panel p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-2">
                <p className="font-medium">{transaction.debtorName}</p>
                <TransactionTypeBadge type={transaction.type} />
              </div>
              <p className="shrink-0 text-sm font-semibold">
                {formatCurrency(transaction.amount)}
              </p>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {transaction.date}
            </p>
          </article>
        ))}
      </div>

      <div className="glass-panel hidden overflow-hidden md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-white/20 bg-white/10">
            <tr>
              {["Debtor", "Type", "Amount", "Date"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left font-medium text-muted-foreground"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-white/10 last:border-b-0"
              >
                <td className="px-4 py-3">{transaction.debtorName}</td>
                <td className="px-4 py-3">
                  <TransactionTypeBadge type={transaction.type} />
                </td>
                <td className="px-4 py-3 font-medium">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {transaction.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  if (rows.length === 0) {
    return (
      <div className="glass-panel p-5 text-sm text-muted-foreground">
        No records found.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((cells, index) => (
          <article key={index} className="glass-panel p-4">
            <div className="grid gap-3">
              {headers.map((header, cellIndex) => (
                <div key={`${index}-${header}`} className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {header}
                  </span>
                  <div className="text-sm">{cells[cellIndex]}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="glass-panel hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-white/20 bg-white/10">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left font-medium text-muted-foreground"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, index) => (
              <tr
                key={index}
                className="border-b border-white/10 last:border-b-0"
              >
                {cells.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 align-middle">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
