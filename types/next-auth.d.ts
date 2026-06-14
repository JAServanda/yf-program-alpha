import type { UserRole } from "@/lib/users";

declare module "next-auth" {
  interface Session {
    user: {
      email?: string | null;
      role?: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string;
    role?: UserRole;
  }
}
