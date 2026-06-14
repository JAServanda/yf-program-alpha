import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-zinc-950">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Access denied
        </h1>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Your Google account is not on the approved email list.
        </p>
        <Link
          href="/login"
          className="rounded-full bg-foreground px-6 py-3 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Back to sign in
        </Link>
      </main>
    </div>
  );
}
