import { GoogleSignInButton } from "@/components/google-sign-in-button";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-8 rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-zinc-950">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Sign in
          </h1>
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Use your approved Google account to continue.
          </p>
        </div>
        <GoogleSignInButton />
      </main>
    </div>
  );
}
