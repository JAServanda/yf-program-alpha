import { GoogleSignInButton } from "@/components/google-sign-in-button";

export default function LoginPage() {
  return (
    <div className="app-gradient flex min-h-svh flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
      <main className="glass-panel flex w-full max-w-md flex-col items-center gap-6 p-6 text-center sm:gap-8 sm:p-10">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Sign in
          </h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Use your approved Google account to continue.
          </p>
        </div>
        <GoogleSignInButton />
      </main>
    </div>
  );
}
