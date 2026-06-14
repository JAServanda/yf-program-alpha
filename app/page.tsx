import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth-helpers";

export default async function Home() {
  await requireSession();
  redirect("/dashboard");
}
