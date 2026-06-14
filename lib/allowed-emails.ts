export const ALLOWED_EMAILS = [
  "jaservanda@gmail.com",
] as const;

export function isEmailAllowed(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.toLowerCase();
  return ALLOWED_EMAILS.some((allowed) => allowed.toLowerCase() === normalized);
}
