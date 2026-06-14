"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransactionTypeBadge } from "@/components/dashboard-ui";
import {
  debtors,
  formatCurrency,
  type Transaction,
} from "@/lib/mock-data";
import { useTransactions } from "@/components/transactions-provider";

type FormState = Omit<Transaction, "id">;

const emptyForm: FormState = {
  debtorName: debtors[0]?.fullName ?? "",
  type: "payment",
  amount: 0,
  date: new Date().toISOString().slice(0, 10),
};

export function TransactionManagePanel() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useTransactions();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.debtorName || form.amount <= 0 || !form.date) {
      return;
    }

    if (editingId) {
      updateTransaction(editingId, form);
    } else {
      addTransaction(form);
    }

    resetForm();
  }

  function startEdit(transaction: Transaction) {
    setEditingId(transaction.id);
    setForm({
      debtorName: transaction.debtorName,
      type: transaction.type,
      amount: transaction.amount,
      date: transaction.date,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="glass-panel flex flex-col gap-4 p-4 sm:p-5"
      >
        <div>
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit transaction" : "Add transaction"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Record a payment or disbursement for a debtor.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Debtor</span>
            <select
              value={form.debtorName}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  debtorName: event.target.value,
                }))
              }
              className="glass-subtle h-10 rounded-md px-3 text-sm outline-none"
            >
              {debtors.map((debtor) => (
                <option key={debtor.id} value={debtor.fullName}>
                  {debtor.fullName}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Type</span>
            <select
              value={form.type}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  type: event.target.value as Transaction["type"],
                }))
              }
              className="glass-subtle h-10 rounded-md px-3 text-sm outline-none"
            >
              <option value="payment">Payment</option>
              <option value="disbursement">Disbursement</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Amount</span>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={form.amount || ""}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  amount: Number(event.target.value),
                }))
              }
              className="glass-subtle border-white/20 bg-white/20 backdrop-blur-md"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Date</span>
            <Input
              type="date"
              value={form.date}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  date: event.target.value,
                }))
              }
              className="glass-subtle border-white/20 bg-white/20 backdrop-blur-md"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="submit" className="w-full sm:w-auto">
            {editingId ? "Save changes" : "Add transaction"}
          </Button>
          {editingId ? (
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={resetForm}
            >
              Cancel edit
            </Button>
          ) : null}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Existing transactions</h2>
        {transactions.length === 0 ? (
          <div className="glass-panel p-5 text-sm text-muted-foreground">
            No transactions yet. Add one using the form above.
          </div>
        ) : (
          transactions.map((transaction) => (
            <article
              key={transaction.id}
              className="glass-panel flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{transaction.debtorName}</p>
                  <TransactionTypeBadge type={transaction.type} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(transaction.amount)} · {transaction.date}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none"
                  onClick={() => startEdit(transaction)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="flex-1 sm:flex-none"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  Delete
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
