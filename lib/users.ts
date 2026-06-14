export type UserRole = "admin" | "investor";

export const USER_ROLES = {
  "jaservanda@gmail.com": "admin",
  "jaservanda@up.edu.ph": "investor",
} as const satisfies Record<string, UserRole>;

export function getRoleForEmail(
  email: string | null | undefined,
): UserRole | null {
  if (!email) return null;

  const normalized = email.toLowerCase();
  const entry = Object.entries(USER_ROLES).find(
    ([allowedEmail]) => allowedEmail.toLowerCase() === normalized,
  );

  return entry?.[1] ?? null;
}

export function isEmailAllowed(email: string | null | undefined): boolean {
  return getRoleForEmail(email) !== null;
}

export function hasRole(
  email: string | null | undefined,
  role: UserRole,
): boolean {
  return getRoleForEmail(email) === role;
}

export function isAdmin(email: string | null | undefined): boolean {
  return hasRole(email, "admin");
}
